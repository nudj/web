const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/signup', respondWith())
  router.postHandlers('/signup', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
