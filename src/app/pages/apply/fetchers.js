const post = (props) => {
  const { params, session } = props
  const { data } = session

  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

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
            referral: referral
          ) {
            id
          }
        }
      }
    }
  `

  const variables = { companySlug, jobSlug, referral: referralId, person: data.person.id }

  return { gql, variables }
}

module.exports = {
  post
}
