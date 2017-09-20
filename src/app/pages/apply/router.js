const express = require('express')
const createHash = require('hash-generator')

const fetchers = require('./fetchers')

const cacheApplySecret = (req, res, next) => {
  req.session.applySecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.applySecret}`
  next()
}

const checkApplySecret = (req, res, next) => {
  if (req.params.secret !== req.session.applySecret) {
    delete req.session.applySecret
    throw new Error('Not found')
  }
  next()
}

const deleteApplySecret = (req, res, next) => {
  delete req.session.applySecret
  delete req.session.returnTo
  next()
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  router.get('/jobs/:companySlugJobSlugRefId/apply', (req, res) => {
    req.session.notification = {
      type: 'error',
      message: 'No direct access to this url allowed, please apply using the button below'
    }
    res.redirect(`/jobs/${req.params.companySlugJobSlugRefId}`)
  })
  router.post('/jobs/:companySlugJobSlugRefId/apply', cacheApplySecret, ensureLoggedIn, deleteApplySecret, respondWith(fetchers.post))
  router.get('/jobs/:companySlugJobSlugRefId/apply/:secret', checkApplySecret, ensureLoggedIn, deleteApplySecret, respondWith(fetchers.post))

  return router
}

module.exports = Router
