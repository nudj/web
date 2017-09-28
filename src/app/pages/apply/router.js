const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  validateJobUrl,
  noDirectApplyNudj,
  cacheApplyNudjSecret,
  checkApplyNudjSecret,
  deleteApplyNudjSecret
} = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()

  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply', validateJobUrl({ redirect: true }), noDirectApplyNudj)
  router.postHandlers('/jobs/:companySlugJobSlugReferralId/apply', validateJobUrl({ redirect: true }), cacheApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWith(fetchers.post))
  router.getHandlers('/jobs/:companySlugJobSlugReferralId/apply/:secret', validateJobUrl({ redirect: true }), checkApplyNudjSecret, ensureLoggedIn, deleteApplyNudjSecret, respondWith(fetchers.post))

  return router
}

module.exports = Router
