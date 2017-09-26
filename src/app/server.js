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
const path = require('path')
const server = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')
const find = require('lodash/find')

const App = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
const expressRouters = {
  insecure: [
    require('./server/routers/webhook-typeform')
  ],
  secure: [
    require('./server/routers/auth'),
    require('./pages/home/router'),
    require('./pages/hirer/router'),
    require('./pages/request/router'),
    require('./pages/signup/router'),
    require('./pages/job/router'),
    require('./pages/apply/router'),
    require('./pages/nudj/router'),
    require('./pages/token/router'),
    require('./server/routers/job-redirects'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.join(__dirname, 'server/assets')
const mockData = require('./mock-data')
const spoofLoggedIn = (req, res, next) => {
  req.session.data = req.session.data || {
    person: find(mockData.people, { id: '25' })
  }
  next()
}

const errorAlreadyReferredApplied = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: error.message
  }
  let destination = req.originalUrl.split('/')
  logger.log('error', error.message, req.method, req.params, destination.pop(), error)
  destination = destination.join('/')
  res.redirect(destination)
}
const errorInvalidToken = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: error.message
  }
  logger.log('error', error.message, req.method, req.params, error)
  res.redirect('/')
}
const errorHandlers = {
  'Already referred': errorAlreadyReferredApplied,
  'Already applied': errorAlreadyReferredApplied,
  'Invalid token': errorInvalidToken
}

server({
  App,
  reduxRoutes,
  reduxReducers,
  expressRouters,
  expressAssetPath,
  mockData,
  spoofLoggedIn,
  errorHandlers
})
