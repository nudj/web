const post = ({ params, session, query }) => {
  const { data } = session
  const { companySlug, jobSlug } = params
  const { referralId } = query

  const gql = `
    mutation CreateApplicationForPerson (
      $companySlug: String!
      $jobSlug: String!
      $person: ID!
      $referral: ID = null
    ) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        id
        slug
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          id
          slug
          application: createApplication(
            person: $person,
            referral: $referral
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
    referral: referralId,
    person: data.person.id
  }

  return { gql, variables }
}

module.exports = {
  post
}
