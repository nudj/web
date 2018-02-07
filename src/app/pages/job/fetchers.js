const template = require('../../server/modules/template')

const get = ({ params, session, req, res }) => {
  const { data } = session

  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

  const gql = `
    query GetReferralAndJobForPerson (
      $companySlug: String!,
      $jobSlug: String!,
      $referralId: ID,
      $personId: ID,
      $loggedIn: Boolean!,
      $browserId: String,
      $eventType: EventType!
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
          application: applicationByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
            id
          }
          referral: referralByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
            id
          }
          relatedJobs {
            id
            title
            slug
            company {
              name
              slug
            }
          }
        }
      }
    }
  `

  const variables = {
    companySlug,
    jobSlug,
    referralId,
    personId: data && data.person && data.person.id,
    loggedIn: !!(data && data.person),
    browserId: req.cookies.browserId,
    eventType: 'viewed'
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
