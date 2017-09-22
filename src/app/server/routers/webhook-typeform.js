const express = require('express')
const get = require('lodash/get')

const logger = require('../lib/logger')

const employeeSurveys = require('../modules/employee-surveys')
const hirers = require('../modules/hirers')
const jobShare = require('../modules/job-share')
const tasks = require('../modules/tasks')
const tokens = require('../modules/tokens')

const commonErrors = {
  'badRequest': {
    code: 400,
    message: 'Bad request',
    type: 'error'
  },
  'notFound': {
    code: 404,
    message: 'Token could not be found',
    type: 'error'
  }
}

function generateLinkFromToken (token) {
  return `https://${process.env.DOMAIN}/token/${token}`
}

// Just handles API errors
function errorHandler (req, res, next) {
  return (error) => {
    const message = error.message || error
    const status = error.code || 500
    logger.log('error', message, error)
    res.status(status).send(message)
  }
}

function typeformSurveryResponseHanlder (req, res, next) {
  const token = get(req.body, 'form_response.hidden.token', '')

  if (!token) {
    return errorHandler(req, res, next)(commonErrors.notFound)
  }

  tokens.get({}, token)
    .then(data => data.token ? data : Promise.reject(commonErrors.notFound))
    .then(data => data.token.type === 'SURVEY_TYPEFORM_COMPLETE' ? data : Promise.reject(commonErrors.badRequest))
    .then(data => employeeSurveys.get(data, get(data.token, 'data.employeeSurvey')))
    .then(data => {
      const typeformToken = get(req.body, 'form_response.token', '')
      return employeeSurveys.patch(data, data.employeeSurvey.id, { typeformToken })
    })
    .then(data => {
      const personId = get(data.employeeSurvey, 'employee.person.id')
      return hirers.getByPerson(data, personId)
    })
    .then(data => {
      const companyId = get(data.employeeSurvey, 'employee.company.id')
      const hirerId = get(data, 'hirer.id', null)
      const taskType = 'HIRER_SURVEY'
      return tasks.completeTaskByType(data, companyId, hirerId, taskType)
    })
    .then(data => {
      // Create token of type `SHARE_COMPANY_JOBS`
      const type = 'SHARE_COMPANY_JOBS'
      const tokenData = {
        employeeSurvey: data.employeeSurvey.id
      }
      return tokens.post(data, type, tokenData)
    })
    .then(data => {
      const {employee, survey} = data.employeeSurvey
      const firstName = get(employee, 'person.firstName', '')
      const lastName = get(employee, 'person.lastName', '')
      const email = get(employee, 'person.email', '')
      const companyName = get(employee, 'company.name')
      const token = get(data.newToken, 'token')
      const link = generateLinkFromToken(token)
      const surveyLink = get(survey, 'link')
      return jobShare.send(firstName, lastName, email, link, surveyLink, companyName)
        .then(() => Promise.resolve(data))
    })
    .then(data => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ 'token': data.newToken.token }))
    })
    .catch(error => errorHandler(req, res, next)(error))
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()
  router.post('/webhooks/typeform-survey-response', typeformSurveryResponseHanlder)
  return router
}

module.exports = Router
