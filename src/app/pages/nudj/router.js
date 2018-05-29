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

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))
  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/nudj/:secret', checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
