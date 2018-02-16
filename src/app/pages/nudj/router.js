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

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', handleJobUrls, noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', handleJobUrls, cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))
  router.getHandlers('/companies/:companySlug/jobs/nudj/:secret', handleJobUrls, checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.post))

  // Legacy urls
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj', handleJobUrls)
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj/:secret', handleJobUrls)

  return router
}

module.exports = Router
