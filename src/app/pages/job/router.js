const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { handleJobUrls } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug', handleJobUrls, respondWithGql(fetchers.get))
  router.getHandlers('/jobs/:companySlugJobSlugReferralId', handleJobUrls)

  return router
}

module.exports = Router
