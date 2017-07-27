const logger = require('../lib/logger')
const intercom = require('../lib/intercom')
const request = require('../lib/request')
const { merge } = require('@nudj/library')
const queries = require('./queries-mutations')

function promiseMap (promiseObj) {
  let promiseArr = []
  let keyMap = {}
  Object.keys(promiseObj).forEach((key, i) => {
    keyMap[i] = key
    promiseArr[i] = promiseObj[key]
  })
  return Promise.all(promiseArr).then((resolvedArr) => {
    return resolvedArr.reduce((resolvedObj, v, i) => {
      resolvedObj[keyMap[i]] = v
      return resolvedObj
    }, {})
  })
}

function fetchBaseData (params, person) {
  let {
    companySlug,
    jobSlug,
    refId
  } = params
  return request(`
    query {
      company: companyByFilters(filters: {
        slug: "${companySlug}"
      }) {
        name
      }
      job: jobByFilters(filters: {
        slug: "${jobSlug}"
      }) {
        id
        created
        modified
        title
        slug
        url
        status
        bonus
        description
        type
        remuneration
        tags
        location
        relatedJobs {
          id
          title
          slug
          company {
            name
            slug
          }
        }
      }
      ${refId ? `referral(id: "${refId}") {
        id
      }` : ''}
    }
  `)
  .then(data => merge({
    company: null,
    job: null,
    referral: null,
    person
  }, data))
}

function ensureValidReferralUrl (data) {
  let company = data.company
  let job = data.job
  let referral = data.referral
  if (
    !company ||
    !job ||
    company.id !== job.company.id ||
    (referral && referral.job.id !== job.id)
  ) {
    throw new Error('Not found')
  }
  return data
}

function ensureValidReferralUrlNew (params) {
  return request(queries.GetCompanyJobAndReferral, params)
  .then(data => {
    let company = data.company
    let job = data.job
    let referral = data.referral
    if (
      !company ||
      !job ||
      company.id !== job.company.id ||
      (referral && referral.job.id !== job.id)
    ) {
      throw new Error('Not found')
    }
    return data
  })
}

function fetchReferrer (data) {
  let referral = data.referral
  if (referral) {
    data.referrer = request(`people/${referral.personId}`)
  }
  return promiseMap(data)
}

function fetchExisting (type) {
  return (data) => {
    const job = data.job
    const person = data.person

    if (job && person) {
      data[type] = request(`${type}s/first?jobId=${job.id}&personId=${person.id}`)
    }

    return promiseMap(data)
  }
}

function ensureDoesNotExist (type) {
  return (data) => {
    if (data[type]) {
      throw new Error(`Already ${type === 'application' ? 'applied' : 'referred'}`)
    }
    return Promise.resolve(data)
  }
}

function apply (data) {
  data.application = request(`applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId: data.job.id,
      personId: data.person.id,
      referralId: data.referral ? data.referral.id : null
    })
  }).then((application) => {
    if (application.error) {
      logger.log('error', application)
      throw new Error()
    }
    intercom.updateUser({
      email: data.person.email,
      name: `${data.person.firstName} ${data.person.lastName}`,
      custom_attributes: {
        profile_url: data.person.url
      }
    })
    return application
  })
  return promiseMap(data)
}

module.exports.get = function (params) {
  return ensureValidReferralUrlNew(params).then(() => request(queries.GetReferralAndJobForPerson, params))
}

module.exports.nudj = function (params) {
  return ensureValidReferralUrlNew(params).then(data => request(queries.CreateReferralForPerson, {
    parent: params.refId,
    job: data.job.id,
    person: params.personId
  }))
}

module.exports.apply = function (params, personUpdate) {
  return fetchBaseData(params, person)
  .then(ensureValidReferralUrl)
  .then(fetchReferrer)
  .then(fetchExisting('application'))
  .then(ensureDoesNotExist('application'))
  .then(apply)
}
