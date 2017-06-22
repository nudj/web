let express = require('express')
let passport = require('passport')
let fetch = require('../lib/fetch')
let intercom = require('../lib/intercom')
let logger = require('../lib/logger')

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

    fetch(`people/first?email=${email}`)
    .then((person) => {
      if (!person) {
        return fetch(`people`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, firstName, lastName, url})
        })
      } else {
        return person
      }
    })
    .then((person) => {
      if (person.error) {
        throw new Error('Unable to login')
      } else {
        req.session.person = person
        res.redirect(req.session.returnTo || '/')
      }
    })
    .catch((error) => {
      logger.log('error', error)
      next('Unable to login')
    })
  }
)

router.get('/login', cacheReturnTo, passport.authenticate('auth0', {}), (req, res, next) => res.redirect(req.session.returnTo || '/'))

module.exports = router
