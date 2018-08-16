const get = (props) => {
  const { params } = props

  const gql = `
    query GetCompanyAndJob($companySlug: String!, $jobSlug: String!) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        name
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

module.exports = { get }
