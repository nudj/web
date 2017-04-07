let logger = require('../logger')
let fetch = require('../lib/fetch')

function getBaseData (companySlug, jobSlugRefId, loggedInPerson) {
  let jobSlug = jobSlugRefId.split('+')[0]
  let refId = jobSlugRefId.split('+')[1]
  return Promise.all([
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobSlug}`),
    loggedInPerson,
    refId ? fetch(`referrals/${refId}`) : undefined
  ])
}

function ensureValidReferralUrl (data) {
  let company = data[0]
  let job = data[1]
  let referral = data[3]
  if (
    company.code === 404 ||
    (referral && referral.code === 404) ||
    job.code === 404 ||
    company.id !== job.companyId ||
    (referral && referral.jobId !== job.id)
  ) {
    throw new Error('Not found')
  }
  return data
}

function returnGetResponse ([
  company,
  job,
  person,
  referral
]) {
  return {
    company,
    job,
    person,
    referral
  }
}

function fetchExisting (type) {
  return (data) => {
    let job = data[1]
    let person = data[2]
    return Promise.all(data.concat(fetch(`${type}s/first?jobId=${job.id}&personId=${person.id}`)))
  }
}

function nudj ([
  company,
  job,
  referrer,
  parentReferral,
  existingReferral
]) {
  // ensure person hasn't already referred this job
  if (existingReferral.code !== 404) {
    logger.log('error', 'Already referred', existingReferral)
    throw new Error('Already referred')
  }
  // create new referral
  return Promise.all([
    company,
    job,
    referrer,
    parentReferral,
    fetch(`referrals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId: job.id,
        personId: referrer.id,
        referralId: parentReferral ? parentReferral.id : null
      })
    })
  ])
}

function returnNudjResponse ([
  company,
  job,
  referrer,
  parentReferral,
  referral
]) {
  if (referral.error) {
    logger.log('error', referral)
    throw new Error()
  }

  return {
    company,
    job,
    referrer,
    parentReferral,
    referral
  }
}

function updatePerson (data, personUpdate) {
  if (typeof personUpdate.url === 'string') {
    let person = data[2]
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
      data[2] = person
      return data
    })
    .then(([
      company,
      job,
      person,
      referral,
      application
    ]) => {
      return [
        company,
        job,
        person,
        referral,
        application.error ? undefined : application
      ]
    })
  } else {
    logger.log('error', 'Invalid url', personUpdate.url)
    throw new Error('Invalid url')
  }
}

function apply ([
  company,
  job,
  person,
  referral,
  existingApplication
]) {
  // ensure person hasn't already applied for this job
  if (existingApplication.code !== 404) {
    logger.log('error', 'Already applied')
    throw new Error('Already applied')
  }

  return Promise.all([
    company,
    job,
    person,
    referral,
    fetch(`applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId: job.id,
        personId: person.id,
        referralId: referral ? referral.id : null
      })
    })
  ])
}

function returnApplyResponse ([
  company,
  job,
  person,
  referral,
  application
]) {
  if (application.error) {
    logger.log('error', application)
    throw new Error()
  }
  return {
    company,
    job,
    person,
    referral,
    application
  }
}

module.exports.get = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(returnGetResponse)
}

module.exports.nudj = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('referral'))
  .then(nudj)
  .then(returnNudjResponse)
}

module.exports.apply = function (companySlug, jobSlugRefId, loggedInPerson, personUpdate) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('application'))
  .then((data) => {
    if (personUpdate.url) {
      return updatePerson(data, personUpdate)
    } else {
      return apply(data)
    }
  })
  .then(returnApplyResponse)
}
