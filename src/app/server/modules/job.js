const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function getReferralBySlugForJobInCompany ({
  companySlug,
  jobSlug,
  referralSlug
}) {
  return request(queries.getReferralBySlugForJobInCompany, {
    companySlug,
    jobSlug,
    referralSlug
  })
}
module.exports.getReferralBySlugForJobInCompany = getReferralBySlugForJobInCompany

function getReferralByLegacyId ({
  referralLegacyId
}) {
  return request(queries.getReferralByLegacyId, {
    referralLegacyId
  })
}
module.exports.getReferralByLegacyId = getReferralByLegacyId

function getJobInCompany ({
  companySlug,
  jobSlug
}) {
  return request(queries.getJobInCompany, {
    companySlug,
    jobSlug
  })
}
module.exports.getJobInCompany = getJobInCompany

module.exports.get = function ({
  companySlug,
  jobSlug,
  referralId,
  personId,
  loggedIn
}) {
  return request(queries.GetReferralAndJobForPerson, {
    companySlug,
    jobSlug,
    referralId,
    personId,
    loggedIn
  })
}

module.exports.getAllByCompany = function ({ company }) {
  return request(queries.GetJobsForCompany, { company })
    .then(data => data.jobs)
}

module.exports.getNudjByJobAndPerson = function ({ job, person }) {
  return request(queries.GetReferralByJobAndPerson, { job, person })
    .then(data => data.referral)
}

module.exports.nudj = function ({ parent, job, person }) {
  return request(queries.CreateReferralForPerson, { parent, job, person })
}

module.exports.getReferral = function ({ job, person }) {
  return request(queries.GetReferral, { job, person })
}

module.exports.apply = function ({ referral, job, person }) {
  return request(queries.CreateApplicationForPerson, { referral, job, person })
}
