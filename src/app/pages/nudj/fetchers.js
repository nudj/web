const { logger } = require('@nudj/library')
const intercom = require('@nudj/library/lib/analytics/intercom')
const omitBy = require('lodash/omitBy')
const isNil = require('lodash/isNil')
const { Redirect } = require('@nudj/framework/errors')

const logReferralToIntercom = async (data) => {
  try {
    const { company } = data
    const { job } = company
    const { referral: { person } } = job
    const name = person.firstName && person.lastName
      ? `${person.firstName} ${person.lastName}`
      : null
    const lead = await intercom.lead.getBy({ email: person.email })

    if (lead && lead.id) {
      await intercom.lead.convertToUser({
        id: lead.id,
        email: person.email
      })
    } else {
      const intercomUser = omitBy({
        email: person.email,
        name,
        custom_attributes: {
          lastJobReferredFor: `${job.title} at ${company.name}`
        }
      }, isNil)
      await intercom.user.create(intercomUser)
    }

    await intercom.user.logEvent({
      user: {
        email: person.email,
        name
      },
      event: {
        name: 'new-referral',
        metadata: {
          jobTitle: job.title,
          company: company.name
        }
      }
    })
  } catch (error) {
    logger('error', 'Intercom error', error)
  }

  return data
}

const get = (props) => {
  const { params } = props

  const gql = `
    query GetCompanyAndJob(
      $companySlug: String!,
      $jobSlug: String!
    ) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        name
        slug
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          title
          slug
        }
      }
    }
  `

  const variables = {
    companySlug: params.companySlug,
    jobSlug: params.jobSlug
  }

  return {
    gql,
    variables
  }
}

const post = ({ params, body }) => {
  const { companySlug, jobSlug } = params
  const {
    email,
    firstName,
    lastName,
    acceptedTerms,
    referralId: parent
  } = body

  if (!acceptedTerms) {
    throw new Redirect({
      url: `/companies/${companySlug}/jobs/${jobSlug}/nudj?referralId=${parent}`,
      notification: {
        type: 'error',
        message: 'You need to accept our terms before we can generate your referral link.'
      }
    })
  }

  const gql = `
    mutation CreateReferralForPerson (
      $companySlug: String!
      $jobSlug: String!
      $person: PersonCreateInput!
      $parent: ID = null
    ) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        id
        name
        slug
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          id
          slug
          title
          bonus
          referral: getOrCreatePersonAndReferral(
            person: $person,
            parent: $parent
          ) {
            id
            person {
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  `
  const variables = {
    companySlug,
    jobSlug,
    person: {
      email,
      firstName,
      lastName,
      acceptedTerms
    },
    parent
  }

  return {
    gql,
    variables,
    transformData: logReferralToIntercom
  }
}

module.exports = {
  get,
  post
}
