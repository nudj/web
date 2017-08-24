const express = require('express')
const get = require('lodash/get')
const routerApi = express.Router()
const routerApplication = express.Router()

const {getRenderer, getRenderDataBuilder} = require('../lib/render')
const logger = require('../lib/logger')
const { promiseMap } = require('../lib')

const employees = require('../modules/employees')
const job = require('../modules/job')
const tokens = require('../modules/tokens')
const jobShare = require('../modules/job-share')
const surveys = require('../modules/surveys')

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
  return `https://nudj.co/token/${token}`
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

function referEachJob (jobs, company, person) {
  const companySlug = company.slug
  const personId = person.id

  const referrals = jobs.map(singleJob => {
    const jobSlug = singleJob.slug
    const jobId = singleJob.id
    return job.nudj({companySlug, jobSlug, personId})
      .catch(error => {
        if (error.message !== 'Already referred') {
          return Promise.reject(error)
        }
        return job.getNudjByJobAndPerson(jobId, personId)
          .then(referral => Promise.resolve({ referral }))
      })
  })

  return Promise.all(referrals)
    .then(referralResults => [].concat.apply([], referralResults || []).map(result => result.referral))
}

function shareCompanyJobsHandler (data) {
  // From the token data we have survey, employee, and typeformToken
  const token = data.token
  const {employee} = token.data
  // const {employee, survey, typeformToken} = token.data

  // Get the employee
  // Get the person from the employee
  // Get the company from the employee
  return employees.get(data, employee)
    .then(data => {
      const company = data.employee.company
      // Get the jobs from the company
      return job.getAllByCompany(data, company.id)
    })
    .then(data => {
      // For each job, create a referral link
      const {company, person} = data.employee
      const jobs = data.jobs
      data.referrals = referEachJob(jobs, company, person)
      return promiseMap(data)
    })
    .then(data => {
      data.jobs.forEach(job => {
        const referral = data.referrals.find(referral => referral.job.slug === job.slug)
        job.referral = referral
      })
      return data
    })
    .then(data => {
      const {firstName, lastName, email} = data.employee.person
      const companyName = get(data.employee, 'company.name')
      const link = generateLinkFromToken(data.token.token)
      jobShare.viewed(firstName, lastName, email, companyName, link)
      return data
    })

  // TODO Get the survey UUID from the survey
}

function subTokenHandler (data) {
  const tokenType = data.token.type
  switch (tokenType) {
    case 'SHARE_COMPANY_JOBS':
      return shareCompanyJobsHandler(data)
    default:
      return Promise.reject(commonErrors.badRequest)
  }
}

function tokenHandler (req, res, next) {
  tokens.get({}, req.params.token)
    .then(data => data.token ? data : Promise.reject(commonErrors.notFound))
    .then(data => subTokenHandler(data))
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(error => {
      logger.log('error', error)
      const data = getRenderDataBuilder(req)({error})
      getRenderer(req, res, next)(data)
    })
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
      const employee = get(data.token, 'data.employee')
      const survey = get(data.token, 'data.survey')
      const tokenData = {employee, survey, typeformToken}
      const type = 'SHARE_COMPANY_JOBS'
      return tokens.post(data, type, tokenData)
    })
    .then(data => employees.get(data, get(data.token, 'data.employee')))
    .then(data => surveys.get(data, get(data.token, 'data.survey')))
    .then(data => {
      const firstName = get(data.employee, 'person.firstName', '')
      const lastName = get(data.employee, 'person.lastName', '')
      const email = get(data.employee, 'person.email', '')
      const companyName = get(data.employee, 'company.name')
      const token = get(data.newToken, 'token')
      const link = generateLinkFromToken(token)
      const surveyLink = get(data.survey, 'link')
      return jobShare.send(firstName, lastName, email, link, surveyLink, companyName)
        .then(() => Promise.resolve(data))
    })
    .then(data => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ 'token': data.newToken.token }))
    })
    .catch(error => errorHandler(req, res, next)(error))
}

routerApi.post('/token/typeform-survey-response', typeformSurveryResponseHanlder)
routerApplication.get('/token/:token', tokenHandler)

module.exports = {
  api: routerApi,
  application: routerApplication
}
