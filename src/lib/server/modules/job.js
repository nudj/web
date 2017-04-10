let isURL = require('validator/lib/isURL')
let logger = require('../lib/logger')
let fetch = require('../lib/fetch')

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
      throw new Error(`Already ${type === 'application' ? 'applied' : 'referred'}`)
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

function validatePersonFields (personData) {
  personData = Object.assign({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    url: undefined
  }, personData)
  let anyInvalid = false
  let fields = Object.keys(personData).reduce((fields, field) => {
    let value = personData[field]
    let invalid
    switch (field) {
      case 'firstName':
      case 'lastName':
        invalid = !(!!value && typeof value === 'string' && !!value.length)
        break
      case 'url':
        invalid = !(!!value && typeof value === 'string' && !!value.length && isURL(value))
        break
    }
    fields[field] = {
      value,
      invalid
    }
    if (invalid) {
      anyInvalid = true
    }
    return fields
  }, {})
  return {
    invalid: anyInvalid,
    fields
  }
}

function updatePerson (data, personUpdate) {
  let person = data.person
  return fetch(`people/${person.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(personUpdate)
  })
  .then((person) => {
    if (person.error) {
      logger.log('error', 'Person update failed', person)
      throw new Error('Person update failed')
    }
    data.person = person
    return data
  })
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
  .then(ensureDoesNotExist('application'))
  .then((data) => {
    let personValidity
    if (personUpdate.url !== undefined) {
      // form submitted
      personValidity = validatePersonFields(personUpdate)
      if (personValidity.invalid) {
        data.form = personValidity.fields
        logger.log('error', 'Invalid data', personUpdate)
        return data
      } else {
        return updatePerson(data, personUpdate).then(apply)
      }
    } else {
      // page accessed
      personValidity = validatePersonFields(data.person)
      if (personValidity.invalid) {
        data.form = personValidity.fields
        logger.log('error', 'Incomplete data', personUpdate)
        return data
      } else {
        return apply(data)
      }
    }
  })
}
