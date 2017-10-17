const { merge } = require('@nudj/library')
const request = require('../../server/modules/request')

const post = ({
  data,
  body
}) => request.send(body.first_name, body.last_name, body.email, body.company_name)
  .then(response => merge(data, response))

module.exports = {
  post
}
