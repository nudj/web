let libRequest = require('@nudj/library/lib/request')
let logger = require('./logger')

function request (query, variables) {
  return libRequest(`http://api:81/`, {
    method: 'post',
    data: {
      query,
      variables
    }
  })
  .then(data => {
    if (data.errors) {
      data.errors.forEach(error => logger.log('error', error.message, `request - http://api:81/`, query, variables))
      throw new Error('Something went wrong')
    }
    return data
  })
  .then(data => data.data)
  .catch((error) => {
    logger.log('error', error.message, `request`, query, variables)
    throw new Error('Something went wrong')
  })
}

module.exports = request
