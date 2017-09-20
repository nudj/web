const job = require('../../server/modules/job')

const post = ({
  data,
  params
}) => {
  const companySlugJobSlugRefId = params.companySlugJobSlugRefId
  const [
    companySlug,
    jobSlug,
    refId
  ] = companySlugJobSlugRefId.split('+')

  return job.ensureValidReferralUrl({
    companySlug,
    jobSlug,
    refId
  })
  .then(valid => job.apply({
    referral: refId,
    job: valid.job.id,
    person: data.person.id
  }))
}

module.exports = {
  post
}
