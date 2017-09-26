const createRouter = require('@nudj/framework/router')
const createHash = require('hash-generator')

const fetchers = require('./fetchers')
const { DataError } = require('../../lib/errors')

const noDirectNudj = (req, res, next) => {
  throw new DataError({
    message: 'No direct nudj',
    companySlugJobSlugRefId: req.params.companySlugJobSlugRefId
  })
}

const cacheNudjSecret = (req, res, next) => {
  req.session.nudjSecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.nudjSecret}`
  next()
}

const checkNudjSecret = (req, res, next) => {
  if (req.params.secret !== req.session.nudjSecret) {
    delete req.session.nudjSecret
    noDirectNudj(req, res, next)
  }
  next()
}

const deleteNudjSecret = (req, res, next) => {
  delete req.session.nudjSecret
  next()
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugRefId/nudj', noDirectNudj)
  router.postHandlers('/jobs/:companySlugJobSlugRefId/nudj', cacheNudjSecret, ensureLoggedIn, deleteNudjSecret, respondWith(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugRefId/nudj/:secret', checkNudjSecret, ensureLoggedIn, deleteNudjSecret, respondWith(fetchers.post))

  return router
}

module.exports = Router
