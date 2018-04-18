const postApplicationUpdate = ({ session, body }) => {
  const { userId } = session

  const gql = `
    mutation UpdatePersonForApplication($userId: ID!, $data: PersonUpdateInput!) {
      person: updatePerson(id: $userId, data: $data) {
        id
      }
    }
  `

  const variables = {
    userId,
    data: body
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  postApplicationUpdate
}
