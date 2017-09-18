const request = require('../../server/modules/request')

const post = ({
  data,
  body
}) => request.send(body.first_name, body.last_name, body.email, body.company_name)

module.exports = {
  post
}
