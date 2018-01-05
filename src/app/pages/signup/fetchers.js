const signup = require('../../server/modules/signup')

const post = ({ body }) => {
  signup.send(
    body.first_name,
    body.last_name,
    body.email,
    body.job_title,
    body.role
  )

  return {
    transformData: () => ({ success: true }) 
  }
}

module.exports = {
  post
}
