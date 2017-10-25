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
  .then(result => job.nudj({
    parent: referralId,
    job: result.company.job.id,
    person: data.person.id
  }))
  .then(referral => merge(data, referral))
  .catch(error => {
    if (error.message === 'Already referred') {
      throw new Redirect({
        url: `/jobs/${params.companySlugJobSlugReferralId}`,
        notification: {
          type: 'error',
          message: 'You have already shared this job'
        }
      },
      'User attempted to share the job again', {
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
