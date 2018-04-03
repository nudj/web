const template = require('../../server/modules/template')

const get = ({ params, session, query, req, res }) => {
  const { userId } = session

  const { companySlug, jobSlug } = params
  const { referralId } = query

  const gql = `
    query GetReferralAndJobForPerson (
      $companySlug: String!,
      $jobSlug: String!,
      $referralId: ID,
      $personId: ID,
      $loggedIn: Boolean!,
      $browserId: String,
      $eventType: EventType!,
      $relatedJobStatus: JobStatus!
    ) {
      referral: referral(
        id: $referralId
      ) {
        id
        job {
          slug
          company {
            slug
          }
        }
      }
      company: companyByFilters(filters: {slug: $companySlug}) {
        id
        name
        logo
        industry
        mission
        slug
        description
        url
        jobs: jobsByFilters(filters: {status: $relatedJobStatus}) {
          id
          title
          remuneration
          location
          slug
        }
        job: jobByFilters(filters: {slug: $jobSlug}) {
          recordEvent(type: $eventType, browserId: $browserId) {
            id
            browserId
          }
          id
          created
          modified
          title
          slug
          url
          status
          bonus
          description
          roleDescription
          candidateDescription
          type
          remuneration
          templateTags
          location
          status
          application: applicationByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
            id
          }
          referral: referralByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
            id
          }
        }
      }
    }
  `

  const variables = {
    companySlug,
    jobSlug,
    referralId,
    personId: userId,
    loggedIn: !!userId,
    browserId: req.cookies.browserId,
    eventType: 'viewed',
    relatedJobStatus: 'PUBLISHED'
  }

  return {
    gql,
    variables,
    transformData: async data => {
      res.cookie('browserId', data.company.job.recordEvent.browserId)
      const templates = await jobPrismicTemplate(data.company.job)
      return Object.assign({}, data, { templates })
    }
  }
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
