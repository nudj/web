const { actionMapAssign } = require('@nudj/library')
const logger = require('@nudj/framework/logger')

const job = require('../../server/modules/job')
const template = require('../../server/modules/template')
const queries = require('../../server/lib/queries-mutations')

const get = ({ params, session }) => {
  const { data } = session

  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

  const gql = queries.GetReferralAndJobForPerson

  const variables = {
    companySlug,
    jobSlug,
    referralId,
    personId: data && data.person && data.person.id,
    loggedIn: !!(data && data.person)
  }

  return {
    gql,
    variables,
    transformData: async data => {
      debug('data', data)
      const templates = await jobPrismicTemplate(data.company.job)
      return Object.assign({}, data, { templates })
    }
  }
}

function jobPrismicTemplate(job) {
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
