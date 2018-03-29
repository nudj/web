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
          referral: createReferral(
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

  return { gql, variables }
}

module.exports = {
  post
}
