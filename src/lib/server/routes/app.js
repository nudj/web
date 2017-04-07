let express = require('express')
let get = require('lodash/get')
let _ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

let logger = require('../logger')
let job = require('../modules/job')
let build = require('../build').default
let router = express.Router()

function ensureLoggedIn (req, res, next) {
  if (req.session.logout) {
    res.redirect('/')
  } else {
    _ensureLoggedIn(req, res, next)
  }
  delete req.session.logout
}

function getRenderDataBuilder (req) {
  return (page) => {
    req.session.person = page.person || req.session.person
    page.person = req.session.person
    if (req.session.message) {
      page.message = req.session.message
      delete req.session.message
    }
    page.url = {
      protocol: req.protocol,
      hostname: req.hostname,
      originalUrl: req.originalUrl
    }
    return {
      page
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
            message: error.message
          }
          let destination = req.originalUrl.split('/')
          logger.log('error', error.message, req.method, req.params.companySlug, req.params.jobSlugRefId, destination.pop(), error)
          destination = destination.join('/')
          res.redirect(destination)
          break
        // renders with message
        case 'Invalid url':
          errorMessage = {
            code: 400,
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
                message: 'Not found'
              }
              break
            default:
              errorMessage = {
                code: 500,
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
    let renderResult = build(data)
    if (renderResult.url) {
      res.redirect(renderResult.url)
    } else {
      let status = get(data, 'error.code', 200)
      res.status(status).render('app', {
        data: JSON.stringify(data),
        html: renderResult
      })
    }
  }
}

function jobHandler (req, res, next) {
  job
    .get(req.params.companySlug, req.params.jobSlugRefId, req.session.person)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

let nudjHandler = (req, res, next) => {
  job
    .nudj(req.params.companySlug, req.params.jobSlugRefId, req.session.person)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

function applyHandler (req, res, next) {
  job
    .apply(req.params.companySlug, req.params.jobSlugRefId, req.session.person, req.body)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

router.get('/:companySlug/:jobSlugRefId', jobHandler)
router.get('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.post('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.get('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applyHandler)
router.post('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applyHandler)

router.get('*', (req, res) => {
  let data = getRenderDataBuilder(req)({})
  getRenderer(req, res)(data)
})

module.exports = router
