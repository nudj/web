const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function fetchHirer (id) {
  return request(queries.GetHirer, { id })
    .then(data => data.hirer)
}

function fetchHirerByPerson (person) {
  return request(queries.GetHirerFromPerson, { person })
    .then(data => data.hirer)
}

module.exports.get = function (data, id) {
  data.hirer = fetchHirer(id)
  return promiseMap(data)
}

module.exports.getByPerson = function (data, person) {
  data.hirer = fetchHirerByPerson(person)
  return promiseMap(data)
}
