const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { noDirectApplyNudj } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply/complete', noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/apply/complete', ensureLoggedIn, respondWithGql(fetchers.postApplicationUpdate))

  return router
}

module.exports = Router
