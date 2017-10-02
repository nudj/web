const { LogThenRedirect } = require('@nudj/framework/errors')

const job = require('../../server/modules/job')

const post = ({
  data,
  params
}) => {
  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

  return job.getJobInCompany({ companySlug, jobSlug })
  .then(result => job.apply({
    referral: referralId,
    job: result.company.job.id,
    person: data.person.id
  }))
  .catch(error => {
    if (error.message === 'Already applied') {
      throw new LogThenRedirect('You have already applied for this job', `/jobs/${params.companySlugJobSlugReferralId}`, {
        companySlug,
        jobSlug,
        referralId
      }, data.person.email)
    }
    throw error
  })
}

module.exports = {
  post
}
