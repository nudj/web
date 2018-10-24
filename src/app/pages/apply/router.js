const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { handleJobUrls } = require('../../server/lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply', handleJobUrls, respondWithGql(fetchers.get))
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/apply', respondWithGql(fetchers.post))

  // Legacy urls
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply', handleJobUrls)
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply/:secret', handleJobUrls)

  return router
}

module.exports = Router
