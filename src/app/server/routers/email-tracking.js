const express = require('express')
const path = require('path')
const messages = require('../modules/messages')
const { NotFound } = require('@nudj/framework/errors')

async function emailTrackingResponseHandler (req, res, next) {
  const token = req.params.token
  const message = await messages.getByPixelToken(token)

  if (!message) {
    return next(new NotFound('Invalid token', token))
  }

  const readCount = message.readCount + 1
  const id = message.id

  await messages.updateReadCount(id, { readCount })
  return res.sendFile(path.join(__dirname, 'tracker.png'))
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
