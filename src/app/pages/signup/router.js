const express = require('express')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.post('/signup', respondWith(fetchers.post))

  return router
}

module.exports = Router
