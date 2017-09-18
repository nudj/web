const express = require('express')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.get('/token/:token', respondWith(fetchers.get))

  return router
}

module.exports = Router
