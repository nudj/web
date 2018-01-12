const post = (props) => {
  const { params, session } = props
  const { data } = session

  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

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
        slug
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          id
          slug
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
  const variables = { companySlug, jobSlug, parent: referralId, person: data.person.id }

  return { gql, variables }
}

module.exports = {
  post
}
