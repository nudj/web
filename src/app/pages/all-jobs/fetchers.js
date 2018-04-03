const get = ({ params }) => {
  const gql = `
    query GetCompanyAndJobs($jobStatus: JobStatus!) {
      jobs: jobsByFilters(filters: {status: $jobStatus}) {
        title
        slug
        remuneration
        location
        status
        company {
          name
          slug
        }
      }
    }
  `

  const variables = {
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
