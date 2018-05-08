const post = ({ body }) => {
  const gql = `
    mutation RequestAccess (
      $firstName: String
      $lastName: String
      $email: String!
      $company: String
      $jobUrl: String
    ) {
      requestAccess (
        firstName: $firstName
        lastName: $lastName
        email: $email
        company: $company
        jobUrl: $jobUrl
      ) {
        success
      }
    }
  `
  const variables = {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    company: body.company_name,
    jobUrl: body.job_url
  }

  return { gql, variables }
}

module.exports = {
  post
}
