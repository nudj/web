const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { validateJobUrl } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugReferralId', validateJobUrl({ redirect: false }), respondWith(fetchers.get))

  return router
}

module.exports = Router
