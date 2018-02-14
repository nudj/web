const get = ({ params }) => {
  const gql = `
    query GetCompanyAndJobs ($companySlug: String!, $client: Boolean!) {
      company: companyByFilters(filters: { slug: $companySlug, client: $client }) {
        name
        slug
        description
        jobs {
          title
          slug
        }
      }
    }
  `

  const variables = {
    companySlug: params.companySlug,
    client: true
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
