const express = require('express')
const get = require('lodash/get')
const router = express.Router()

const logger = require('../lib/logger')
const tokens = require('../modules/tokens')

const commonErrors = {
  'badRequest': {
    message: 'Bad request',
    status: 400
  },
  'notFound': {
    message: 'Token could not be found',
    status: 404
  }
}

function errorHandler (req, res, next) {
  return (error) => {
    const message = error.message || error
    const status = error.status || 500
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
    .then(data => {
      // Create token of type `SHARE_COMPANY_JOBS` containing: survey, employee, and typeform API token
      const typeformToken = get(req.body, 'form_response.token', '')
      const employee = data.token.employee
      const survey = data.token.survey
      const tokenData = {employee, survey, typeformToken}
      const type = 'SHARE_COMPANY_JOBS'
      return tokens.post(data, type, tokenData)
    })
    .then(data => {
      console.log('data.newToken', data.newToken)
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ 'token': data.newToken.token }))
    })
    .catch(error => errorHandler(req, res, next)(error))
}

router.post('/token/typeform-survey-response', typeformSurveryResponseHanlder)

module.exports = router
