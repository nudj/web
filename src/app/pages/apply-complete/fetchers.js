const postApplication = ({ params, body }) => {
  const gql = `
    mutation CreatePersonAndApplication($companySlug: String!, $jobSlug: String!, $person: PersonCreateInput!) {
      company: companyByFilters(filters: {slug: $companySlug}) {
        name
        job: jobByFilters(filters: {slug: $jobSlug}) {
          getOrCreatePersonAndApplication(person: $person) {
            id
          }
        }
      }
    }

  `

  const variables = {
    person: body,
    companySlug: params.companySlug,
    jobSlug: params.jobId
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  postApplication
}
