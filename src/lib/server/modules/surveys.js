const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

function fetchSurvey (id) {
  return request(queries.GetSurvey, { id })
    .then(data => data.survey)
}

module.exports.get = function (data, id) {
  data.survey = fetchSurvey(id)
  return promiseMap(data)
}
