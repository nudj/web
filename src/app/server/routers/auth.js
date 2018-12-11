const express = require('express')
const passport = require('passport')
const { cookies } = require('@nudj/library')
const logger = require('@nudj/framework/logger')
const { Analytics } = require('@nudj/library/server')
const { omitUndefined } = require('@nudj/library')

const request = require('../lib/request')
const intercom = require('../lib/intercom')
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

function checkForErrors (data) {
  if (data.errors) {
    logger.log('error', data.errors[0].message, data.errors[0])
    throw new Error('Unable to login')
  }
  return data
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  // Perform session logout and redirect to last known page or homepage
  router.get('/logout', cacheReturnTo, (req, res, next) => {
    req.logOut()
    delete req.session.userId
    delete req.session.analyticsEventProperties
    req.session.logout = true
    cookies.clear(res, 'session')
    res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent(`${process.env.PROTOCOL_DOMAIN}/loggedout`)}&client_id=${process.env.AUTH0_CLIENT_ID}`)
  })

  router.get('/loggedout', (req, res, next) => {
    const returnTo = req.session.returnTo
    req.session.destroy(() => res.redirect(returnTo || '/'))
  })

  router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    (req, res, next) => {
      if (!req.user) {
        throw new Error('user null')
      }

      const analytics = new Analytics({ app: 'web', distinctId: req.cookies.mixpanelDistinctId })
      const {email, firstName, lastName, url} = getUserInfo(req.user._json)

      // Add the `INTERCOM_ENABLED` check here as there are no `visitors` methods
      // in the `@nudj/library` intercom lib as of version `7.4.0`
      if (req.session._intercom_visitor_id && process.env.INTERCOM_ENABLED === 'true') {
        intercom.convertVisitorToUser({
          'user_id': req.session._intercom_visitor_id
        }, { email })
        .catch((error) => {
          logger.log('Unable to convert visitor to user', req.session._intercom_visitor_id, email, error)
        })
      }

      request(queries.GetPersonByEmail, {email})
        .then(checkForErrors)
        .then(async data => {
          let response
          if (!data.person) {
            response = await request(queries.CreatePerson, {
              email,
              firstName,
              lastName,
              url,
              signedUp: true,
              acceptedTerms: true
            })
          } else if (!data.person.signedUp) {
            response = await request(queries.UpdatePerson, {
              id: data.person.id,
              data: omitUndefined({ firstName, lastName, signedUp: true })
            })
          }

          const userData = omitUndefined({
            name: firstName && lastName ? `${firstName} ${lastName}` : undefined,
            email
          })

          if (response) {
            await analytics.alias({ alias: response.person.id }, userData)
            await analytics.track({
              object: analytics.objects.user,
              action: analytics.actions.user.signedUp
            })

            return response
          } else {
            await analytics.identify({ id: data.person.id }, userData, {
              preserveTraits: true
            })
            analytics.track({
              object: analytics.objects.user,
              action: analytics.actions.user.loggedIn
            })

            return data
          }
        })
        .then(checkForErrors)
        .then(data => {
          req.session.userId = data.person.id
          res.redirect(req.session.returnTo || '/')
        })
        .catch((error) => {
          logger.log('error', error)
          next('Unable to login')
        })
    }
  )

  router.get('/login', cacheReturnTo, passport.authenticate('auth0', {}), (req, res, next) => res.redirect(req.session.returnTo || '/'))

  return router
}

module.exports = Router
