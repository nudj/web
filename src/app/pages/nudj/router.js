const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  validateJobUrl,
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

  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj', validateJobUrl, noDirectApplyNudj)
  router.postHandlers('/jobs/:companySlugJobSlugReferralId/nudj', validateJobUrl, cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj/:secret', validateJobUrl, checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
