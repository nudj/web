const post = ({ body }) => {
  const gql = `
    mutation RequestAccess (
      $firstName: String
      $lastName: String
      $email: String!
      $company: String
      $externalJobUrl: String
    ) {
      requestAccess (
        firstName: $firstName
        lastName: $lastName
        email: $email
        company: $company
        externalJobUrl: $externalJobUrl
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
    externalJobUrl: body.external_job_url
  }

  return { gql, variables }
}

module.exports = {
  post
}
