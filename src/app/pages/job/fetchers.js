const { actionMapAssign } = require('@nudj/library')
const logger = require('@nudj/framework/logger')

const job = require('../../server/modules/job')
const template = require('../../server/modules/template')

const get = ({
  data,
  params
}) => {
  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

  return job.get({
    companySlug,
    jobSlug,
    referralId,
    personId: data.person && data.person.id,
    loggedIn: !!data.person
  })
  .then(result => actionMapAssign(
    data,
    {
      referral: result.referral,
      job: result.company.job
    },
    {
      templates: data => jobPrismicTemplate(data.job)
    }
  ))
  .catch(error => {
    logger.log('error', error.message, params, data)
    throw error
  })
}

function jobPrismicTemplate (job) {
  const type = 'jobdescription'
  const keys = {
    title: 'title',
    description: 'description',
    colourPrimary: 'colourprimary'
  }
  let tags = ['default']

  if (job.templateTags && job.templateTags.length) {
    tags = [].concat(...job.templateTags)
  }

  return template.getRandom({ type, tags, keys })
}

module.exports = {
  get
}
