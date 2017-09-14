const { promiseMap } = require('@nudj/library')

const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

const apiKey = process.env.TYPEFORM_API_KEY

function fetchSurvey (id) {
  return request(queries.GetSurvey, { id })
    .then(data => data.survey)
}

function fetchSurveyResults (uuid, token) {
  const url = `https://api.typeform.com/v1/form/${uuid}?key=${apiKey}&token=${token}`
  return request.openRequest(url)
}

module.exports.get = function (data, id) {
  data.survey = fetchSurvey(id)
  return promiseMap(data)
}

module.exports.getResults = function (data, uuid, token) {
  data.surveyResults = fetchSurveyResults(uuid, token)
  return promiseMap(data)
}
