const { Redirect } = require('@nudj/framework/errors')
const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/', respondWith(fetchers.get))
  router.getHandlers('/hiring', (req, res, next) => {
    next(new Redirect({
      url: `/`
    }))
  })

  return router
}

module.exports = Router
