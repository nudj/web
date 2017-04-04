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
    switch (error.message) {
      case 'Already referred':
      case 'Already applied':
        req.session.message = {
          code: 403,
          message: error.message
        }
        let destination = req.originalUrl.split('/')
        logger.log('error', req.method, req.params.companySlug, req.params.jobSlugRefId, destination.pop(), error)
        destination = destination.join('/')
        res.redirect(destination)
        break
      case 'Not found':
      default:
        let data = getRenderDataBuilder(req)({
          error: {
            code: error.message === 'Not found' ? 404 : 500,
            message: error.message === 'Not found' ? error.message : 'Something went wrong'
          }
        })
        getRenderer(req, res, next)(data)
    }
  }
}

function getRenderer (req, res, next) {
  return (data) => {
    console.log('data', data)
    try {
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
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }
}

function homeHandler (req, res, next) {
  let data = getRenderDataBuilder(req)({})
  getRenderer(req, res)(data)
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
    .apply(req.params.companySlug, req.params.jobSlugRefId, req.session.person)
    .then(getRenderDataBuilder(req, res, next))
    .then(getRenderer(req, res, next))
    .catch(getErrorHandler(req, res, next))
}

router.get('/', homeHandler)
router.get('/:companySlug/:jobSlugRefId', jobHandler)
router.get('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.post('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.get('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applyHandler)
router.post('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applyHandler)

router.get('*', (req, res) => {
  let data = {page: {}}
  let renderResult = build(data, req.url)
  if (renderResult.url) {
    res.writeHead(302, {
      Location: renderResult.url
    })
    res.end()
  } else {
    return res.render('app', {
      data: JSON.stringify(data),
      html: renderResult
    })
  }
})

module.exports = router
