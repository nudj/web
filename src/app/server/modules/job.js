const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function ensureValidReferralUrl ({
  companySlug,
  jobSlug,
  refId
}) {
  return request(queries.GetCompanyJobAndReferral, {
    companySlug,
    jobSlug,
    refId
  })
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
module.exports.ensureValidReferralUrl = ensureValidReferralUrl

module.exports.get = function ({
  companySlug,
  jobSlug,
  refId,
  personId,
  loggedIn
}) {
  return request(queries.GetReferralAndJobForPerson, {
    companySlug,
    jobSlug,
    refId,
    personId,
    loggedIn
  })
}

module.exports.getAllByCompany = function ({ company }) {
  return request(queries.GetJobsForCompany, { company })
    .then(data => data.job)
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
