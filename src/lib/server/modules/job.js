let isURL = require('validator/lib/isURL')
let logger = require('../logger')
let fetch = require('../lib/fetch')

function promiseMap (promiseObj) {
  let promiseArr = []
  let keyMap = {}
  let i = 0
  Object.keys(promiseObj).forEach((key) => {
    keyMap[i] = key
    promiseArr[i] = promiseObj[key]
    i++
  })
  return Promise.all(promiseArr).then((rArr) => {
    return rArr.reduce((responseObj, v, i) => {
      responseObj[keyMap[i]] = v
      return responseObj
    }, {})
  })
}

function getBaseData (companySlug, jobSlugRefId, loggedInPerson) {
  let jobSlug = jobSlugRefId.split('+')[0]
  let refId = jobSlugRefId.split('+')[1]
  let requests = {
    company: fetch(`companies/${companySlug}`),
    job: fetch(`jobs/${jobSlug}`),
    person: loggedInPerson,
    referral: refId && fetch(`referrals/${refId}`)
  }
  return promiseMap(requests)
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

function fetchExisting (type) {
  return (data) => {
    let job = data.job
    let person = data.person
    data[type] = fetch(`${type}s/first?jobId=${job.id}&personId=${person.id}`)
    return promiseMap(data)
  }
}

function ensureDoesNotExist (type) {
  return (data) => {
    if (data[type]) {
      let message = `Already ${type === 'application' ? 'applied' : 'referred'}`
      logger.log('error', message)
      throw new Error(message)
    }
    return Promise.resolve(data)
  }
}

function nudj (data) {
  data.referral = fetch(`referrals`, {
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

function updatePerson (data, personUpdate) {
  if (typeof personUpdate.url === 'string' && isURL(personUpdate.url)) {
    let person = data.person
    return fetch(`people/${person.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: personUpdate.url
      })
    })
    .then((person) => {
      if (person.error) {
        logger.log('error', 'Person update failed', person)
        throw new Error('Person update failed')
      }
      data.person = person
      return data
    })
  } else {
    logger.log('error', 'Invalid url', personUpdate.url)
    throw new Error('Invalid url')
  }
}

function apply (data) {
  data.application = fetch(`applications`, {
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
    return application
  })
  return promiseMap(data)
}

module.exports.get = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
}

module.exports.nudj = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('referral'))
  .then(ensureDoesNotExist('referral'))
  .then(nudj)
}

module.exports.apply = function (companySlug, jobSlugRefId, loggedInPerson, personUpdate) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('application'))
  .then((data) => {
    if (personUpdate.url !== undefined) {
      return updatePerson(data, personUpdate)
    } else {
      return ensureDoesNotExist('application')(data).then(apply)
    }
  })
}
