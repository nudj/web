const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/request', respondWith())
  router.postHandlers('/request', respondWith(fetchers.post))

  return router
}

module.exports = Router
