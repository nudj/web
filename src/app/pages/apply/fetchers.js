const postApplication = (props) => {
  const { params, session, query } = props
  const { userId } = session
  const { companySlug, jobSlug } = params
  const { referralId } = query

  const gql = `
    mutation CreateApplicationForPerson($companySlug: String!, $jobSlug: String!, $referralId: ID, $userId: ID!) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        name
      }
      job: jobByFilters(filters: {
        slug: $jobSlug
      }) {
        id
        slug
        application: createApplication(
          person: $userId,
          referral: $referralId
        ) {
          id
        }
      }
      user(id: $userId) {
        company {
          name
        }
        role {
          name
        }
        url
      }
    }
  `

  const variables = {
    companySlug,
    jobSlug,
    referralId,
    userId
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  postApplication
}
