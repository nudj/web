const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { noDirectApplyNudj } = require('../../server/lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/companies/:companySlug/jobs/:jobSlug/apply/complete', noDirectApplyNudj)
  router.postHandlers('/companies/:companySlug/jobs/:jobSlug/apply/complete', respondWithGql(fetchers.postApplication))

  return router
}

module.exports = Router
