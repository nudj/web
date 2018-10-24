const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  handleJobUrls
} = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', handleJobUrls, respondWithGql(fetchers.get))
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/nudj', handleJobUrls, respondWithGql(fetchers.post))

  // Legacy urls
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj', handleJobUrls)
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/nudj/:secret', handleJobUrls)

  return router
}

module.exports = Router
