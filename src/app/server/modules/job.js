const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function ensureValidReferralUrl (params) {
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
module.exports.ensureValidReferralUrl = ensureValidReferralUrl

module.exports.get = function (params) {
  return request(queries.GetReferralAndJobForPerson, params)
}

module.exports.getAllByCompany = function (data, company) {
  data.jobs = request(queries.GetJobsForCompany, {company})
    .then(data => data.job)
  return promiseMap(data)
}

module.exports.getNudjByJobAndPerson = function (params) {
  return request(queries.GetReferralByJobAndPerson, {
    job: params.job,
    person: params.person
  })
  .then(data => data.referral)
}

module.exports.nudj = function (params) {
  return request(queries.CreateReferralForPerson, {
    parent: params.parent,
    job: params.job,
    person: params.person
  })
}

module.exports.getReferral = function (params) {
  return request(queries.GetReferral, {
    job: params.job,
    person: params.person
  })
}

module.exports.apply = function (params) {
  return request(queries.CreateApplicationForPerson, {
    referral: params.referral,
    job: params.job,
    person: params.person
  })
}
