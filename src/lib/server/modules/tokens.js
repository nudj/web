const createHash = require('hash-generator')
const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

const hashLength = 16

function createToken (type, data) {
  const token = createHash(hashLength)
  return request(queries.CreateToken, { data, token, type })
    .then(data => data.token)
}

function fetchToken (token) {
  return request(queries.GetToken, { token })
    .then(data => data.token)
}

module.exports.get = function (data, token) {
  data.token = fetchToken(token)
  return promiseMap(data)
}

module.exports.post = function (data, type, tokenData) {
  data.newToken = createToken(type, tokenData)
  return promiseMap(data)
}
