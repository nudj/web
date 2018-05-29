const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  noDirectApplyNudj,
  cacheApplyNudjSecret,
  checkApplyNudjSecret,
  deleteApplyNudjSecret
} = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply', noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/apply', cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.postApplication))
  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply/:secret', checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.postApplication))

  return router
}

module.exports = Router
