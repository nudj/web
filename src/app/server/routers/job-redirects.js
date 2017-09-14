const express = require('express')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.get('/:companySlug/:jobSlugRefId', (req, res) => res.redirect(301, `/jobs/${req.params.companySlug}+${req.params.jobSlugRefId}`))

  return router
}

module.exports = Router
