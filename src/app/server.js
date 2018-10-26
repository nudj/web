require('envkey')
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (filename.match(/@nudj/) || filename.match(/app/)) {
      return false
    }
    return true
  }
})

const http = require('http')
const path = require('path')
const get = require('lodash/get')
const createNudjApps = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')
const { Analytics } = require('@nudj/library/server')
const { omitUndefined } = require('@nudj/library')

const request = require('./server/lib/request')
const queries = require('./server/lib/queries-mutations')
const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const expressRouters = {
  insecure: [
    require('./server/routers/health-check'),
    require('./server/routers/email-tracking')
  ],
  secure: [
    require('./server/routers/auth'),
    require('./pages/talent/router'),
    require('./pages/hirer/router'),
    require('./pages/request/router'),
    require('./pages/signup/router'),
    require('./pages/job/router'),
    require('./pages/apply/router'),
    require('./pages/nudj/router'),
    require('./pages/share/router'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.resolve('./app/server/assets')
const buildAssetPath = path.resolve('./app/server/build')

const spoofLoggedIn = (req, res, next) => {
  req.session.userId = process.env.SPOOF_USER_ID
  next()
}
const errorHandlers = require('./server/errorHandlers')

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'snap.licdn.com',
        'widget.intercom.io',
        'tagmanager.google.com',
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'js.intercomcdn.com',
        'www.fullstory.com'
      ],
      connectSrc: [
        "'self'",
        'api-iam.intercom.io',
        'www.google-analytics.com',
        'nexus-websocket-a.intercom.io',
        'wss://nexus-websocket-a.intercom.io',
        'nexus-websocket-b.intercom.io',
        'wss://nexus-websocket-b.intercom.io',
        'rs.fullstory.com',
        'api.mixpanel.com'
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'cdnjs.cloudflare.com'
      ],
      frameSrc: [
        "'self'",
        'web-wds.local.nudj.co'
      ],
      fontSrc: [
        "'self'",
        'js.intercomcdn.com'
      ],
      imgSrc: [
        "'self'",
        'static.intercomassets.com',
        'www.google-analytics.com',
        'nudjcms.s3.amazonaws.com'
      ],
      mediaSrc: [
        "'self'",
        'nudjcms.s3.amazonaws.com'
      ]
    }
  }
}

async function getAnalytics (req) {
  if (req.session.userId && !req.session.analyticsEventProperties) {
    // A user exists and has no event properties, fetch them.
    try {
      const response = await request(queries.GetHirerFromPerson, {
        person: req.session.userId
      })
      const person = get(response, 'person', {})
      req.session.analyticsEventProperties = omitUndefined({
        name: person.firstName && person.lastName && `${person.firstName} ${person.lastName}`,
        email: person.email,
        companyName: get(person, 'hirer.company.name')
      })
    } catch (error) {
      console.error(`Error fetching analytics EventProperties for user ${req.session.userId}`, error)
    }
  }
  const analyticsData = omitUndefined({
    app: 'hire',
    distinctId: req.session.userId || req.cookies.mixpanelDistinctId,
    eventProperties: req.session.analyticsEventProperties
  })

  const analytics = new Analytics(analyticsData)

  /**
   * Persists the session equivalent of `analytics.traits` and
   * `analytics.eventProperties` whenever they're changed down the chain, e.g.,
   * through the use of `analytics.updateIdentity`
   */
  analytics.onEventPropertiesChange(update => {
    req.session.analyticsEventProperties = update
  })

  return analytics
}

const app = createNudjApps({
  App: reactApp,
  getAnalytics,
  reduxRoutes,
  reduxReducers,
  expressRouters,
  expressAssetPath,
  buildAssetPath,
  spoofLoggedIn,
  errorHandlers,
  helmetConfig
})

http.createServer(app).listen(process.env.API_PORT, () => {
  logger.log('info', 'Application running')
})
