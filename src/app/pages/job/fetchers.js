const { actionMapAssign } = require('@nudj/library')

const job = require('../../server/modules/job')
const template = require('../../server/modules/template')

const get = ({
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
  .then(valid => job.get({
    jobId: valid.company.job.id,
    referralId,
    personId: data.person && data.person.id,
    loggedIn: !!data.person
  }))
  .then(data => actionMapAssign(
    data,
    {
      templates: data => jobPrismicTemplate(data.job)
    }
  ))
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
