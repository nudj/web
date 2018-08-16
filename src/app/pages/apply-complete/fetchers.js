const postApplication = ({ params, body }) => {
  const { referralId, ...person } = body

  const gql = `
    mutation CreatePersonAndApplication(
      $companySlug: String!,
      $jobSlug: String!,
      $person: PersonCreateInput!,
      $referralId: ID
    ) {
      company: companyByFilters(filters: {slug: $companySlug}) {
        name
        job: jobByFilters(filters: {slug: $jobSlug}) {
          getOrCreatePersonAndApplication(person: $person, referral: $referralId) {
            id
          }
        }
      }
    }

  `

  const variables = {
    person,
    referralId,
    companySlug: params.companySlug,
    jobSlug: params.jobSlug
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  postApplication
}
