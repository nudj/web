let nodeFetch = require('node-fetch')
let logger = require('../logger')

function fetch (uri, options) {
  return nodeFetch(`http://api:81/${uri}`, options)
    .then((response) => {
      if (response.code === 500) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .catch((error) => {
      logger.log('error', error.message, `fetch - http://api:81/${uri}`, options)
      throw new Error('Something went wrong')
    })
}

module.exports = fetch
