const express = require('express')
const path = require('path')

function emailTrackingResponseHandler (req, res, next) {
  console.log('Hitting this route with token', req.params.token)
  res.sendFile(path.join(__dirname, 'tracker.png'))
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()
  router.get('/tracker/:token/pixel.png', emailTrackingResponseHandler)
  return router
}

module.exports = Router
