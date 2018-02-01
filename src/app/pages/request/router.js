const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/request', respondWith())
  router.postHandlers('/request', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
