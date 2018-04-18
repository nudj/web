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

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply', handleJobUrls, noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/apply', handleJobUrls, cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.postApplication))
  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply/:secret', handleJobUrls, checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWithGql(fetchers.postApplication))

  // Legacy urls
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply', handleJobUrls)
  router.postHandlers('/jobs/:companySlugJobSlugReferralId/apply', handleJobUrls)
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply/:secret', handleJobUrls)

  return router
}

module.exports = Router
