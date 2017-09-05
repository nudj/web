const request = require('../lib/request')
const queries = require('../lib/queries-mutations')
const { promiseMap } = require('../lib')

function fetchEmployee (id) {
  return request(queries.GetEmployee, { id })
    .then(data => data.employee)
}

module.exports.get = function (data, id) {
  data.employee = fetchEmployee(id)
  return promiseMap(data)
}
