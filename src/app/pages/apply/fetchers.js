const job = require('../../server/modules/job')

const post = ({
  data,
  params
}) => {
  const companySlugJobSlugReferralId = params.companySlugJobSlugReferralId
  const [
    companySlug,
    jobSlug,
    referralId
  ] = companySlugJobSlugReferralId.split('+')

  return job.ensureValidReferralUrl({
    companySlug,
    jobSlug,
    referralId,
    withReferral: !!referralId
  })
  .then(valid => job.apply({
    referral: referralId,
    job: valid.company.job.id,
    person: data.person.id
  }))
}

module.exports = {
  post
}
