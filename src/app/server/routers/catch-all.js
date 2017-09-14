const express = require('express')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.get('*', respondWith(() => Promise.resolve({})))

  return router
}

module.exports = Router
