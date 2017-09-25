const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/signup', respondWith())
  router.postHandlers('/signup', respondWith(fetchers.post))

  return router
}

module.exports = Router
