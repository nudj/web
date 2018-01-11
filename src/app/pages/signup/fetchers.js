const post = ({ body }) => {
  const gql = `
    mutation SignUp (
      $firstName: String
      $lastName: String
      $email: String!
      $title: String
      $role: String
    ) {
      signUp (
        firstName: $firstName
        lastName: $lastName
        email: $email
        title: $title
        role: $role
      ) {
        success
      }
    }
  `
  const variables = {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    title: body.job_title,
    role: body.role
  }

  console.log({ gql, variables })

  return { gql, variables }
}

module.exports = {
  post
}
