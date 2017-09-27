const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function ensureValidReferralUrl ({
  companySlug,
  jobSlug,
  referralId,
  withReferral
}) {
  return request(queries.GetCompanyJobAndReferral, {
    companySlug,
    jobSlug,
    referralId,
    withReferral
  })
  .then(data => {
    if (
      !data.company ||
      !data.company.job ||
      (withReferral && !data.company.job.referral)
    ) {
      throw new Error('Not found')
    }
    return data
  })
}
module.exports.ensureValidReferralUrl = ensureValidReferralUrl

module.exports.get = function ({
  jobId,
  referralId,
  personId,
  loggedIn
}) {
  return request(queries.GetReferralAndJobForPerson, {
    jobId,
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
