const { logger } = require('@nudj/library')
const intercom = require('@nudj/library/lib/analytics/intercom')
const omitBy = require('lodash/omitBy')
const isNil = require('lodash/isNil')

const logReferralToIntercom = async (data) => {
  try {
    const { user, company } = data
    const name = user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : null
    const lead = await intercom.lead.getBy({ email: user.email })

    if (lead && lead.id) {
      await intercom.lead.convertToUser({
        id: lead.id,
        email: user.email
      })
    } else {
      const intercomUser = omitBy({
        email: user.email,
        name,
        custom_attributes: {
          lastJobReferredFor: `${company.job.title} at ${company.name}`
        }
      }, isNil)
      await intercom.user.create(intercomUser)
    }

    await intercom.user.logEvent({
      user: {
        email: user.email,
        name
      },
      event: {
        name: 'new-referral',
        metadata: {
          jobTitle: company.job.title,
          company: company.name
        }
      }
    })
  } catch (error) {
    logger('error', 'Intercom error', error)
  }

  return data
}

const post = ({ params, session, query }) => {
  const { userId } = session
  const { companySlug, jobSlug } = params
  const { referralId } = query

  const gql = `
    mutation CreateReferralForPerson (
      $companySlug: String!
      $jobSlug: String!
      $person: ID!
      $parent: ID = null
    ) {
      user {
        id
        firstName
        lastName
        email
      }
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
          referral: getOrCreateReferralForUser(
            person: $person,
            parent: $parent
          ) {
            id
          }
        }
      }
    }
  `
  const variables = {
    companySlug,
    jobSlug,
    parent: referralId,
    person: userId
  }

  return {
    gql,
    variables,
    transformData: logReferralToIntercom
  }
}

module.exports = {
  post
}
