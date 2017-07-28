const express = require('express')
const passport = require('passport')
const request = require('../lib/request')
const intercom = require('../lib/intercom')
const logger = require('../lib/logger')
const queries = require('../lib/queries-mutations')

function cacheReturnTo (req, res, next) {
  if (!req.session.returnTo) {
    req.session.returnTo = req.get('Referrer')
  }
  next()
}

function getNames (user) {
  const name = user.name ? user.name.split(' ') : ['', '']
  const firstName = user.firstName || user.given_name || name[0]
  const lastName = user.lastName || user.family_name || name[1]
  return {firstName, lastName}
}

function getUserInfo (user) {
  const email = user.email
  const {firstName, lastName} = user.user_metadata ? getNames(user.user_metadata) : getNames(user)
  const url = user.html_url || user.publicProfileUrl || user.url

  return {email, firstName, lastName, url}
}

let router = express.Router()

// Perform session logout and redirect to last known page or homepage
router.get('/logout', (req, res, next) => {
  req.logout()
  delete req.session.person
  req.session.logout = true
  res.redirect(req.get('Referrer') || '/')
})

function checkForErrors (data) {
  if (data.errors) {
    logger.log('error', data.errors[0].message, data.errors[0])
    throw new Error('Unable to login')
  }
  return data
}

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res, next) => {
    if (!req.user) {
      throw new Error('user null')
    }

    const {email, firstName, lastName, url} = getUserInfo(req.user._json)

    if (req.session._intercom_visitor_id) {
      intercom.convertVisitorToUser({
        'user_id': req.session._intercom_visitor_id
      }, {email})
      .catch((error) => {
        logger.log('Unable to convert visitor to user', req.session._intercom_visitor_id, email, error)
      })
    }

    request(queries.GetPersonByEmail, {email})
    .then(checkForErrors)
    .then((data) => {
      if (!data || !data.person) {
        return request(queries.CreatePerson, {email, firstName, lastName, url})
      }
      return data
    })
    .then(checkForErrors)
    .then(data => {
      req.session.person = data.person
      res.redirect(req.session.returnTo || '/')
    })
    .catch((error) => {
      logger.log('error', error)
      next('Unable to login')
    })
  }
)

router.get('/login', cacheReturnTo, passport.authenticate('auth0', {}), (req, res, next) => res.redirect(req.session.returnTo || '/'))

module.exports = router
