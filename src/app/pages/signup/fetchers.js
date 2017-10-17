const { merge } = require('@nudj/library')
const signup = require('../../server/modules/signup')

const post = ({
  data,
  body
}) => signup.send(body.first_name, body.last_name, body.email, body.job_title, body.role)
  .then(response => merge(data, response))

module.exports = {
  post
}
