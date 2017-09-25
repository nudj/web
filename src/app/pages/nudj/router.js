const createRouter = require('@nudj/framework/router')
const createHash = require('hash-generator')

const fetchers = require('./fetchers')

const cacheNudjSecret = (req, res, next) => {
  req.session.nudjSecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.nudjSecret}`
  next()
}

const checkNudjSecret = (req, res, next) => {
  if (req.params.secret !== req.session.nudjSecret) {
    delete req.session.nudjSecret
    throw new Error('Not found')
  }
  next()
}

const deleteNudjSecret = (req, res, next) => {
  delete req.session.nudjSecret
  next()
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugRefId/nudj', (req, res) => {
    req.session.notification = {
      type: 'error',
      message: 'No direct access to this url allowed, please send to a friend using the button below'
    }
    res.redirect(`/jobs/${req.params.companySlugJobSlugRefId}`)
  })
  router.postHandlers('/jobs/:companySlugJobSlugRefId/nudj', cacheNudjSecret, ensureLoggedIn, deleteNudjSecret, respondWith(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugRefId/nudj/:secret', checkNudjSecret, ensureLoggedIn, deleteNudjSecret, respondWith(fetchers.post))

  return router
}

module.exports = Router
