const post = ({ body }) => {
  const gql = `
    mutation RequestAccess (
      $firstName: String
      $lastName: String
      $email: String!
      $company: String
    ) {
      requestAccess (
        firstName: $firstName
        lastName: $lastName
        email: $email
        company: $company
      ) {
        success
      }
    }
  `
  const variables = {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    company: body.company_name
  }

  return { gql, variables }
}

module.exports = {
  post
}
