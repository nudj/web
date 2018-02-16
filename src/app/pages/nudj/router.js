const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  handleJobUrls,
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

  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj', handleJobUrls, noDirectApplyNudj)
  router.postHandlers('/jobs/:companySlugJobSlugReferralId/nudj', handleJobUrls, cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj/:secret', handleJobUrls, checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
