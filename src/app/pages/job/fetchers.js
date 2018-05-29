const { cookies } = require('@nudj/library')
const template = require('../../server/modules/template')

const get = ({ params, session, query, req, res }) => {
  const { userId } = session

  const { companySlug, jobSlug } = params
  const {
    referralId: referralLegacyId,
    referral: referralSlug
  } = query

  let gql
  if (referralLegacyId) {
    gql = `
      query GetReferralAndJobForPerson (
        $companySlug: String!,
        $jobSlug: String!,
        $referralLegacyId: ID,
        $personId: ID,
        $loggedIn: Boolean!,
        $browserId: String,
        $eventType: EventType!,
        $relatedJobStatus: JobStatus!
      ) {
        user {
          company {
            slug
          }
        }
        referral: referralByLegacyId( id: $referralLegacyId ) {
          id
          slug
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
            viewEvent: recordViewEvent(browserId: $browserId) {
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
            remuneration
            template
            location
            status
            application: applicationByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
              id
            }
            referral: referralByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
              id
              slug
            }
          }
        }
      }`
  } else {
    gql = `
      query GetReferralAndJobForPerson (
        $companySlug: String!,
        $jobSlug: String!,
        $referralSlug: String,
        $personId: ID,
        $loggedIn: Boolean!,
        $browserId: String,
        $relatedJobStatus: JobStatus!
      ) {
        user {
          company {
            slug
          }
        }
        referral: referralBySlug( slug: $referralSlug ) {
          id
          slug
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
            viewEvent: recordViewEvent(browserId: $browserId) {
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
            remuneration
            template
            location
            status
            application: applicationByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
              id
            }
            referral: referralByFilters(filters: {person: $personId}) @include(if: $loggedIn) {
              id
              slug
            }
          }
        }
      }
    `
  }

  const variables = {
    companySlug,
    jobSlug,
    referralSlug,
    referralLegacyId,
    personId: userId,
    loggedIn: !!userId,
    browserId: cookies.get(req, 'browserId'),
    eventType: 'viewed',
    relatedJobStatus: 'PUBLISHED'
  }

  return {
    gql,
    variables,
    transformData: async data => {
      cookies.set(res, 'browserId', data.company.job.viewEvent.browserId)
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
  const tags = [job.template || 'default']

  return template.getRandom({ type, tags, keys })
}

module.exports = {
  get
}
