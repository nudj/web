const { merge, promiseMap } = require('@nudj/library')
const _get = require('lodash/get')
const { Redirect, AppError } = require('@nudj/framework/errors')

const employeeSurveys = require('../../server/modules/employee-surveys')
const job = require('../../server/modules/job')
const tokens = require('../../server/modules/tokens')
const jobShare = require('../../server/modules/job-share')
const surveys = require('../../server/modules/surveys')

const queries = require('../../server/lib/queries-mutations')

const debug = (title, ...args) =>
  console.log(`\n\n\n\n\n ${title.toUpperCase()}`, ...args, '\n\n\n\n\n')

function generateLinkFromToken(token) {
  return `https://${process.env.DOMAIN}/token/${token}`
}

function referEachJob(jobs, person) {
  const referrals = jobs.map(singleJob => {
    const referralParams = {
      job: singleJob.id,
      person: person.id
    }
    return job.nudj(referralParams).catch(error => {
      if (error.message !== 'Already referred') {
        return Promise.reject(error)
      }
      return job
        .getNudjByJobAndPerson(referralParams)
        .then(referral => Promise.resolve({ referral }))
    })
  })

  return Promise.all(referrals).then(referralResults =>
    [].concat.apply([], referralResults || []).map(result => result.referral)
  )
}

function shareCompanyJobsHandler(data) {
  // From the token data we have survey, employee, and typeformToken
  const token = data.token
  const employeeSurvey = token.data.employeeSurvey

  // Get the employeeSurveyComplete
  // Get the employee
  // Get the person from the employee
  // Get the company from the employee
  return employeeSurveys
    .get(data, employeeSurvey)
    .then(data => {
      const { employee, survey, typeformToken } = data.employeeSurvey
      const company = employee.company

      data.employee = employee
      data.survey = survey
      data.typeformToken = typeformToken

      // Get the jobs from the company
      return job
        .getAllByCompany({ company: company.id })
        .then(jobs => merge(data, { jobs }))
    })
    .then(data => {
      // For each job, create a referral link
      const { person } = data.employee
      const jobs = data.jobs
      data.referrals = referEachJob(jobs, person)
      return promiseMap(data)
    })
    .then(data => {
      data.jobs.forEach(job => {
        const referral = data.referrals.find(
          referral => referral.job.slug === job.slug
        )
        job.referral = referral
      })
      return data
    })
    .then(data => {
      const { firstName, lastName, email } = data.employee.person
      const companyName = _get(data.employee, 'company.name')
      const link = generateLinkFromToken(data.token.token)
      jobShare.viewed(firstName, lastName, email, companyName, link)
      return data
    })
    .then(data =>
      surveys.getResults(data, data.survey.uuid, data.typeformToken)
    )
    .then(data => {
      const questions = _get(data.surveyResults, 'questions', [])
      const responses = _get(data.surveyResults, 'responses', []).pop()
      data.typeformResults = questions
        .map(question => {
          const questionId = _get(question, 'id', '')

          // Don't include hidden items eg: token
          if (questionId.indexOf('hidden_') === 0) {
            return null
          }

          return {
            id: questionId,
            question: _get(question, 'question'),
            answer: _get(responses, `answers[${questionId}]`)
          }
        })
        .filter(result => result)
      return data
    })
}

function subTokenHandler(data) {
  debug('data', data)

  const tokenType = data.token.type
  switch (tokenType) {
    case 'SHARE_COMPANY_JOBS':
      return shareCompanyJobsHandler(data)
    default:
      return Promise.reject(
        new AppError('Unexpected token type', data.token.type)
      )
  }
}

function get({ params }) {
  const { token } = params

  return {
    gql: queries.GetToken,
    variables: { token: params.token },
    transformData: data => {
      if (!data.token) {
        throw new Redirect(
          {
            url: `/`,
            notification: {
              type: 'error',
              message: 'Invalid token'
            }
          },
          'Invalid token',
          params.token
        )
      }

      return subTokenHandler(data)
    }
  }

  return tokens
    .get(data, params.token)
    .then(
      data =>
        data.token
          ? data
          : Promise.reject(
              new Redirect(
                {
                  url: `/`,
                  notification: {
                    type: 'error',
                    message: 'Invalid token'
                  }
                },
                'Invalid token',
                params.token
              )
            )
    )
    .then(data => subTokenHandler(data))
}

module.exports = {
  get
}
