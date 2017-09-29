const express = require('express')
const { LogThenNotFound } = require('@nudj/framework/errors')

const ignoreAjax = (req, res, next) => {
  // catch ajax requests for first level pages
  // which have urls like /somepage/json
  // so would otherwise be handled by this redirector
  // and respond with a 404
  if (req.params.jobSlugRefId === 'json') {
    next(new LogThenNotFound('Ajax request reached job redirector', req.originalUrl))
  }
  next()
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.get('/:companySlug/:jobSlugRefId', ignoreAjax, (req, res) => res.redirect(301, `/jobs/${req.params.companySlug}+${req.params.jobSlugRefId}`))

  return router
}

module.exports = Router
