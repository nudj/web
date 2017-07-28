let libRequest = require('@nudj/library/lib/request')
let logger = require('./logger')

function request (query, variables) {
  return libRequest(`http://api:82/`, {
    method: 'post',
    data: {
      query,
      variables
    }
  })
  .then(data => {
    if (data.errors) {
      data.errors.forEach(error => logger.log('error', error.message, query, variables))
      throw new Error(data.errors[0].message)
    }
    return data.data
  })
}

module.exports = request
