const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
