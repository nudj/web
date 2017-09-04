const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function createEmployeeSurvey (employee, survey, typeformToken) {
  return request(queries.CreateEmployeeSurvey, { employee, survey, typeformToken })
    .then(data => data.employeeSurvey)
}

function fetchEmployeeSurvey (id) {
  return request(queries.GetEmployeeSurvey, { id })
    .then(data => data.employeeSurvey)
}

module.exports.get = function (data, id) {
  data.employeeSurvey = fetchEmployeeSurvey(id)
  return promiseMap(data)
}

module.exports.post = function (data, employee, survey, typeformToken) {
  data.newEmployeeSurvey = createEmployeeSurvey(employee, survey, typeformToken)
  return promiseMap(data)
}
