const { actionMapAssign } = require('@nudj/library')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../../lib/prismic/api')({accessToken, repo})
const job = require('../../server/modules/job')

const get = ({
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
  .then(() => job.get({
    companySlug,
    jobSlug,
    refId,
    personId: data.person && data.person.id,
    loggedIn: !!data.person
  }))
  .then(data => actionMapAssign(
    data,
    {
      template: data => jobPrismicTemplate(data.job)
    }
  ))
}

function jobPrismicTemplate (job) {
  const prismicQuery = {
    'document.type': 'jobdescription',
    'document.tags': ['default']
  }

  if (job.templateTags && job.templateTags.length) {
    prismicQuery['document.tags'] = [].concat(...job.templateTags)
  }

  return prismic.fetchContent(prismicQuery)
    .then(results => {
      const index = getRandomInt(0, results.length)
      return results[index]
    })
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  get
}
