let nodeFetch = require('node-fetch')

function fetch (uri, options) {
  return nodeFetch(`http://api:81/${uri}`, options).then((response) => response.json())
}

module.exports = fetch
