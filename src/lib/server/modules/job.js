const logger = require('../lib/logger')
const intercom = require('../lib/intercom')
const request = require('../lib/request')
const { merge } = require('@nudj/library')

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
    company.id !== job.companyId ||
    (referral && referral.jobId !== job.id)
  ) {
    throw new Error('Not found')
  }
  return data
}

function fetchReferrer (data) {
  let referral = data.referral
  if (referral) {
    data.referrer = request(`people/${referral.personId}`)
  }
  return promiseMap(data)
}

function makeReferralParentReferral (data) {
  data.parentReferral = data.referral
  delete data.referral
  return data
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

function nudj (data) {
  data.referral = request(`referrals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId: data.job.id,
      personId: data.person.id,
      referralId: data.parentReferral ? data.parentReferral.id : null
    })
  }).then((referral) => {
    if (referral.error) {
      logger.log('error', referral)
      throw new Error()
    }
    return referral
  })
  return promiseMap(data)
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

function extractParams (companySlugJobSlugRefId) {
  const [
    companySlug,
    jobSlug,
    refId
  ] = companySlugJobSlugRefId.split('+')
  return {
    companySlug,
    jobSlug,
    refId
  }
}

module.exports.get = function (companySlugJobSlugRefId, person) {
  let {
    companySlug,
    jobSlug,
    refId
  } = extractParams(companySlugJobSlugRefId)
  return request(`
    query {
      company: companyByFilters(filters: {
        slug: "${companySlug}"
      }) {
        id
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
        company {
          name
        }
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
  // return fetchBaseData(extractParams(companySlugJobSlugRefId), loggedInPerson)
  // .then(ensureValidReferralUrl)
  // .then(fetchExisting('referral'))
  // .then(fetchReferrer)
  // .then(fetchExisting('application'))
}

module.exports.nudj = function (companySlugJobSlugRefId, loggedInPerson) {
  return fetchBaseData(extractParams(companySlugJobSlugRefId), loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchReferrer)
  .then(makeReferralParentReferral)
  .then(fetchExisting('referral'))
  .then(ensureDoesNotExist('referral'))
  .then(nudj)
}

module.exports.apply = function (companySlugJobSlugRefId, loggedInPerson, personUpdate) {
  return fetchBaseData(extractParams(companySlugJobSlugRefId), loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchReferrer)
  .then(fetchExisting('application'))
  .then(ensureDoesNotExist('application'))
  .then(apply)
}
