const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugRefId', respondWith(fetchers.get))

  return router
}

module.exports = Router
