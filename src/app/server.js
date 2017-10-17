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
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.join(__dirname, 'server/assets')
const buildAssetPath = path.join(__dirname, 'server/build')
const mockData = require('./mock-data')
const spoofLoggedIn = (req, res, next) => {
  req.session.data = req.session.data || {
    person: find(mockData.people, { id: '25' })
  }
  next()
}
const errorHandlers = require('./server/errorHandlers')

server({
  App,
  reduxRoutes,
  reduxReducers,
  expressRouters,
  expressAssetPath,
  buildAssetPath,
  mockData,
  spoofLoggedIn,
  errorHandlers
})
