const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { validateJobUrl } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugReferralId', validateJobUrl, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
