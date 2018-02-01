const libRequest = require('@nudj/library/lib/request')
const get = require('lodash/get')

const logger = require('@nudj/framework/logger')

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
  .catch(error => {
    logger.log('debug', JSON.parse(get(error, 'response.config.data', '{}')).query)
    logger.log('debug', JSON.stringify(JSON.parse(get(error, 'response.config.data', '{}')).variables, null, 2))
    get(error, 'response.data.errors', []).forEach(error => logger.log('error', error))
    throw error
  })
}

function openRequest (url, options) {
  return libRequest(url, options)
}

module.exports = request
module.exports.openRequest = openRequest
