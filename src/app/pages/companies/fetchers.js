const get = ({ params }) => {
  const gql = `
    query GetCompanyAndJobs ($companySlug: String!, $client: Boolean!, $jobStatus: JobStatus!) {
      company: companyByFilters(filters: { slug: $companySlug, client: $client }) {
        name
        slug
        description
        jobs: jobsByFilters (filters: {status: $jobStatus }) {
          title
          slug
          status
        }
      }
    }
  `

  const variables = {
    companySlug: params.companySlug,
    client: true,
    jobStatus: 'PUBLISHED'
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
