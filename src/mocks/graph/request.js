const Axios = require('axios')

let config = {
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
try {
  if (process.title === 'node') {
    config.baseURL = 'http://api:81/'
  }
} catch (error) {
  console.log('Browser')
}
const axios = Axios.create(config)

function request (uri, options) {
  return axios(uri, options)
    .then((response) => response.data)
}

module.exports = request
