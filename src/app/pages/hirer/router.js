const createRouter = require('@nudj/framework/router')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/hiring', respondWith())

  return router
}

module.exports = Router
