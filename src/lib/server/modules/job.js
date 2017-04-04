let logger = require('../logger')
let fetch = require('../lib/fetch')

function getBaseData (companySlug, jobSlugRefId, loggedInPerson) {
  let jobSlug = jobSlugRefId.split('+')[0]
  let refId = jobSlugRefId.split('+')[1]
  let initialRequests = [
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobSlug}`),
    loggedInPerson,
    refId ? fetch(`referrals/${refId}`) : undefined
  ]
  return Promise.all(initialRequests)
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

function fetchExisting (type) {
  return (data) => {
    let job = data[1]
    let person = data[2]
    return Promise.all(data.concat(fetch(`${type}s/first?jobId=${job.id}&personId=${person.id}`)))
  }
}

module.exports.get = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(([
    company,
    job,
    person,
    referral
  ]) => {
    return {
      company,
      job,
      person,
      referral
    }
  })
}

module.exports.nudj = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('referral'))
  .then(([
    company,
    job,
    referrer,
    parentReferral,
    existingReferral
  ]) => {
    // ensure person hasn't already referred this job
    if (existingReferral.code !== 404) {
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
  })
  .then(([
    company,
    job,
    referrer,
    parentReferral,
    referral
  ]) => {
    if (referral.error) {
      throw new Error()
    }
    return {
      company,
      job,
      referrer,
      parentReferral,
      referral
    }
  })
}

module.exports.apply = function (companySlug, jobSlugRefId, loggedInPerson) {
  return getBaseData(companySlug, jobSlugRefId, loggedInPerson)
  .then(ensureValidReferralUrl)
  .then(fetchExisting('application'))
  .then(([
    company,
    job,
    person,
    referral,
    existingApplication
  ]) => {
    // ensure person hasn't already applied for this job
    if (existingApplication.code !== 404) {
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
  })
  .then(([
    company,
    job,
    person,
    referral,
    application
  ]) => {
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
  })
}
