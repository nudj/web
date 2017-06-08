let express = require('express')
let get = require('lodash/get')
let getTime = require('date-fns/get_time')
let _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

let logger = require('../lib/logger')
let request = require('../modules/request')
let signup = require('../modules/signup')
let job = require('../modules/job')
let build = require('../build').default
let router = express.Router()

const { promiseMap } = require('../lib')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../../lib/prismic/api')({accessToken, repo})

function spoofLoggedIn (req, res, next) {
  req.session.person = {
    id: '25',
    firstName: 'David',
    lastName: 'Platt',
    email: 'david@nudj.com'
  }
  return next()
}

function doEnsureLoggedIn (req, res, next) {
  if (req.session.logout) {
    let url = req.originalUrl.split('/')
    url.pop()
    res.redirect(url.join('/'))
  } else {
    _ensureLoggedIn(req, res, next)
  }
  delete req.session.logout
}

const spoofUser = process.env.SPOOF_USER === 'true'
const ensureLoggedIn = spoofUser ? spoofLoggedIn : doEnsureLoggedIn

function getRenderDataBuilder (req) {
  return (data) => {
    data.csrfToken = req.csrfToken()
    req.session.person = data.person || req.session.person
    data.person = req.session.person
    if (req.session.message) {
      data.message = req.session.message
      delete req.session.message
    }
    data.url = {
      protocol: req.protocol,
      hostname: req.hostname,
      originalUrl: req.originalUrl
    }
    return {
      page: data
    }
  }
}

function getErrorHandler (req, res, next) {
  return (error) => {
    try {
      let data, errorMessage
      switch (error.message) {
        // redirects with message
        case 'Already referred':
        case 'Already applied':
          req.session.message = {
            code: 403,
            type: 'error',
            message: error.message
          }
          let destination = req.originalUrl.split('/')
          logger.log('error', error.message, req.method, req.params.companySlugJobSlugRefId, destination.pop(), error)
          destination = destination.join('/')
          res.redirect(destination)
          break
        // renders with message
        case 'Invalid url':
          errorMessage = {
            code: 400,
            error: 'error',
            message: 'Form submission data invalid'
          }
          data = getRenderDataBuilder(req)({
            message: errorMessage
          })
          getRenderer(req, res, next)(data)
          break
        // full page errors
        default:
          logger.log('error', error.message, error)
          switch (error.message) {
            case 'Not found':
              errorMessage = {
                code: 404,
                type: 'error',
                message: 'Not found'
              }
              break
            default:
              errorMessage = {
                code: 500,
                type: 'error',
                message: 'Something went wrong'
              }
          }
          data = getRenderDataBuilder(req)({
            error: errorMessage
          })
          getRenderer(req, res, next)(data)
      }
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }
}

function getRenderer (req, res, next) {
  return (data) => {
    delete req.session.logout
    delete req.session.returnTo
    let staticContext = build(data)
    if (staticContext.url) {
      res.redirect(staticContext.url)
    } else {
      let status = get(data, 'page.error.code', staticContext.status || 200)
      let person = get(data, 'page.person')
      res.status(status).render('app', {
        data: JSON.stringify(data),
        css: staticContext.css,
        html: staticContext.html,
        helmet: staticContext.helmet,
        intercom_app_id: `'${process.env.INTERCOM_APP_ID}'`,
        fullname: person && person.firstName && person.lastName && `'${person.firstName} ${person.lastName}'`,
        email: person && `'${person.email}'`,
        created_at: person && (getTime(person.created) / 1000)
      })
    }
  }
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function jobPrismicTemplate (data) {
  const prismicQuery = {
    'document.type': 'jobdescription',
    'document.tags': ['default']
  }

  if (data.job.templateTags && data.job.templateTags.length) {
    prismicQuery['document.tags'] = [].concat(...data.job.templateTags)
  }

  data.template = prismic.fetchContent(prismicQuery)
    .then(results => {
      const index = getRandomInt(0, results.length)
      return results[index]
    })

  return promiseMap(data)
}

function jobHandler (req, res, next) {
  job
    .get(req.params.companySlugJobSlugRefId, req.session.person)
    .then(jobPrismicTemplate)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

let nudjHandler = (req, res, next) => {
  job
    .nudj(req.params.companySlugJobSlugRefId, req.session.person)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function applyHandler (req, res, next) {
  job
    .apply(req.params.companySlugJobSlugRefId, req.session.person, req.body)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function requestHandler (req, res, next) {
  request
    .send(req.body.first_name, req.body.last_name, req.body.email, req.body.company_name)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function signupHandler (req, res, next) {
  signup
    .send(req.body.first_name, req.body.last_name, req.body.email, req.body.job_title, req.body.role)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

router.post('/request', requestHandler)
router.post('/signup', signupHandler)
router.get('/jobs/:companySlugJobSlugRefId', jobHandler)
router.get('/jobs/:companySlugJobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.post('/jobs/:companySlugJobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.get('/jobs/:companySlugJobSlugRefId/apply', ensureLoggedIn, applyHandler)
router.post('/jobs/:companySlugJobSlugRefId/apply', ensureLoggedIn, applyHandler)
router.get('/:companySlug/:jobSlugRefId', (req, res) => res.redirect(301, `/jobs/${req.params.companySlug}+${req.params.jobSlugRefId}`))
router.get('*', (req, res) => {
  let data = getRenderDataBuilder(req)({})
  getRenderer(req, res)(data)
})

module.exports = router
