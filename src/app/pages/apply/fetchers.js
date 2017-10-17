const { Redirect } = require('@nudj/framework/errors')
const { merge } = require('@nudj/library')

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
  .then(application => merge(data, application))
  .catch(error => {
    if (error.message === 'Already applied') {
      throw new Redirect({
        url: `/jobs/${params.companySlugJobSlugReferralId}`,
        notification: {
          type: 'error',
          message: 'You have already applied for this job'
        }
      },
      'User attempted to reapply', {
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
