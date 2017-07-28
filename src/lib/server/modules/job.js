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

module.exports.get = function (params) {
  return ensureValidReferralUrl(params)
  .then(() => request(queries.GetReferralAndJobForPerson, params))
}

module.exports.nudj = function (params) {
  return ensureValidReferralUrl(params)
  .then(data => request(queries.CreateReferralForPerson, {
    parent: params.refId,
    job: data.job.id,
    person: params.personId
  }))
}

module.exports.apply = function (params) {
  return ensureValidReferralUrl(params)
  .then(data => request(queries.CreateApplicationForPerson, {
    referral: params.refId,
    job: data.job.id,
    person: params.personId
  }))
}
