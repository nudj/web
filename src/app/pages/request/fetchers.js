const { merge } = require('@nudj/library')
const request = require('../../server/modules/request')

const post = ({ body }) => {
  request.send(body.first_name, body.last_name, body.email, body.company_name)

  return {
    transformData: () => ({ success: true })
  }
}

module.exports = {
  post
}
