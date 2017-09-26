const createRouter = require('@nudj/framework/router')
const createHash = require('hash-generator')

const fetchers = require('./fetchers')
const { DataError } = require('../../lib/errors')

const noDirectApply = (req, res, next) => {
  throw new DataError({
    message: 'No direct apply',
    companySlugJobSlugRefId: req.params.companySlugJobSlugRefId
  })
}

const cacheApplySecret = (req, res, next) => {
  req.session.applySecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.applySecret}`
  next()
}

const checkApplySecret = (req, res, next) => {
  if (req.params.secret !== req.session.applySecret) {
    delete req.session.applySecret
    noDirectApply(req, res, next)
  }
  next()
}

const deleteApplySecret = (req, res, next) => {
  delete req.session.applySecret
  delete req.session.returnTo
  next()
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugRefId/apply', noDirectApply)
  router.postHandlers('/jobs/:companySlugJobSlugRefId/apply', cacheApplySecret, ensureLoggedIn, deleteApplySecret, respondWith(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugRefId/apply/:secret', checkApplySecret, ensureLoggedIn, deleteApplySecret, respondWith(fetchers.post))

  return router
}

module.exports = Router
