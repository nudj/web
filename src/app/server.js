require('envkey')
console.log('env', process.env)
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (filename.match(/@nudj/) || filename.match(/app/)) {
      return false
    }
    return true
  }
})
console.log(1)
const http = require('http')
const path = require('path')
const createNudjApps = require('@nudj/framework/server')
const logger = require('@nudj/framework/logger')

console.log(2)
const useDevServer = process.env.USE_DEV_SERVER === 'true'

const reactApp = require('./redux')
const reduxRoutes = require('./redux/routes')
const reduxReducers = require('./redux/reducers')
console.log(3)
const expressRouters = {
  insecure: [
    require('./server/routers/health-check'),
    require('./server/routers/email-tracking')
  ],
  secure: [
    require('./server/routers/auth'),
    require('./pages/home/router'),
    require('./pages/hirer/router'),
    require('./pages/request/router'),
    require('./pages/signup/router'),
    require('./pages/job/router'),
    require('./pages/apply/router'),
    require('./pages/apply-complete/router'),
    require('./pages/nudj/router'),
    require('./pages/share/router'),
    require('./server/routers/catch-all')
  ]
}
const expressAssetPath = path.resolve('./app/server/assets')
const buildAssetPath = !useDevServer && path.resolve('./app/server/build')
console.log(4)

const spoofLoggedIn = (req, res, next) => {
  req.session.userId = process.env.SPOOF_USER_ID
  next()
}
const errorHandlers = require('./server/errorHandlers')

console.log(5)
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
        'rs.fullstory.com'
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
if (useDevServer) {
  helmetConfig.contentSecurityPolicy.directives.scriptSrc.push('web-wds.local.nudj.co')
  helmetConfig.contentSecurityPolicy.directives.scriptSrc.push('tagmanager.google.com')

  helmetConfig.contentSecurityPolicy.directives.styleSrc.push('tagmanager.google.com')
  helmetConfig.contentSecurityPolicy.directives.styleSrc.push('fonts.googleapis.com')

  helmetConfig.contentSecurityPolicy.directives.imgSrc.push('ssl.gstatic.com')
  helmetConfig.contentSecurityPolicy.directives.imgSrc.push('www.gstatic.com')

  helmetConfig.contentSecurityPolicy.directives.connectSrc.push('web-wds.local.nudj.co')
  helmetConfig.contentSecurityPolicy.directives.connectSrc.push('wss://web-wds.local.nudj.co')

  helmetConfig.contentSecurityPolicy.directives.fontSrc.push('fonts.gstatic.com')
}
console.log(6)

let app = createNudjApps({
  App: reactApp,
  reduxRoutes,
  reduxReducers,
  expressRouters,
  expressAssetPath,
  buildAssetPath,
  spoofLoggedIn,
  errorHandlers,
  helmetConfig
})

console.log(7)
const server = http.createServer(app)

console.log(8)
server.listen(80, () => {
  logger.log('info', 'Application running')
})

console.log(9)
if (module.hot) {
  console.log(10)
  module.hot.accept([
    './redux',
    './redux/routes',
    './redux/reducers',
    path.resolve('./pages'),
    path.resolve('./components'),
    './server/routers/email-tracking',
    './server/routers/auth',
    './pages/home/router',
    './pages/hirer/router',
    './pages/request/router',
    './pages/signup/router',
    './pages/job/router',
    './pages/all-jobs/router',
    './pages/companies/router',
    './pages/apply/router',
    './pages/apply-complete/router',
    './pages/nudj/router',
    './pages/share/router',
    './server/routers/catch-all'
  ], () => {
    const updatedReactApp = require('./redux')
    const updatedReduxRoutes = require('./redux/routes')
    const updatedReduxReducers = require('./redux/reducers')
    const updatedExpressRouters = {
      insecure: [
        require('./server/routers/email-tracking')
      ],
      secure: [
        require('./server/routers/auth'),
        require('./pages/home/router'),
        require('./pages/hirer/router'),
        require('./pages/request/router'),
        require('./pages/signup/router'),
        require('./pages/job/router'),
        require('./pages/all-jobs/router'),
        require('./pages/companies/router'),
        require('./pages/apply/router'),
        require('./pages/apply-complete/router'),
        require('./pages/nudj/router'),
        require('./pages/share/router'),
        require('./server/routers/catch-all')
      ]
    }

    server.removeListener('request', app)
    const newApp = createNudjApps({
      App: updatedReactApp,
      reduxRoutes: updatedReduxRoutes,
      reduxReducers: updatedReduxReducers,
      expressRouters: updatedExpressRouters,
      expressAssetPath,
      buildAssetPath,
      spoofLoggedIn,
      errorHandlers,
      helmetConfig
    })

    console.log(11)
    server.on('request', newApp)
    app = newApp
  })
}
console.log(12)
