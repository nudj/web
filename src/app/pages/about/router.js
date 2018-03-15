const createRouter = require('@nudj/framework/router')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/about', respondWith())

  return router
}

module.exports = Router
