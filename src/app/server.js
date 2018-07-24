require('envkey')
console.log(11)
console.log('env', process.env)
console.log(12)
require('babel-register')({
  presets: ['react'],
  ignore: function (filename) {
    if (filename.match(/@nudj/) || filename.match(/app/)) {
      return false
    }
    return true
  }
})
console.log(13)
const http = require('http')
console.log(14)
const path = require('path')
console.log(15)
const createNudjApps = require('@nudj/framework/server')
console.log(16)
const logger = require('@nudj/framework/logger')
console.log(17)

const useDevServer = process.env.USE_DEV_SERVER === 'true'
console.log(18)

console.log(19)
const reactApp = require('./redux')
console.log(110)
const reduxRoutes = require('./redux/routes')
console.log(111)
const reduxReducers = require('./redux/reducers')
console.log(112)
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
console.log(113)
const expressAssetPath = path.resolve('./app/server/assets')
console.log(114)
const buildAssetPath = !useDevServer && path.resolve('./app/server/build')
console.log(115)

const spoofLoggedIn = (req, res, next) => {
  console.log(116)
  req.session.userId = process.env.SPOOF_USER_ID
  console.log(117)
  next()
  console.log(118)
}
console.log(119)
const errorHandlers = require('./server/errorHandlers')
console.log(120)

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
console.log(121)
if (useDevServer) {
  console.log(122)
  helmetConfig.contentSecurityPolicy.directives.scriptSrc.push('web-wds.local.nudj.co')
  console.log(123)
  helmetConfig.contentSecurityPolicy.directives.scriptSrc.push('tagmanager.google.com')
  console.log(124)

  helmetConfig.contentSecurityPolicy.directives.styleSrc.push('tagmanager.google.com')
  console.log(125)
  helmetConfig.contentSecurityPolicy.directives.styleSrc.push('fonts.googleapis.com')
  console.log(126)

  helmetConfig.contentSecurityPolicy.directives.imgSrc.push('ssl.gstatic.com')
  console.log(127)
  helmetConfig.contentSecurityPolicy.directives.imgSrc.push('www.gstatic.com')
  console.log(128)

  helmetConfig.contentSecurityPolicy.directives.connectSrc.push('web-wds.local.nudj.co')
  console.log(129)
  helmetConfig.contentSecurityPolicy.directives.connectSrc.push('wss://web-wds.local.nudj.co')
  console.log(130)

  helmetConfig.contentSecurityPolicy.directives.fontSrc.push('fonts.gstatic.com')
  console.log(131)
}
console.log(132)

console.log(133)
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
console.log(134)

const server = http.createServer(app)
console.log(135)

server.listen(80, () => {
  console.log(136)
  logger.log('info', 'Application running')
  console.log(137)
})
console.log(138)

if (module.hot) {
  console.log(139)
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
    console.log(140)
    const updatedReactApp = require('./redux')
    console.log(141)
    const updatedReduxRoutes = require('./redux/routes')
    console.log(142)
    const updatedReduxReducers = require('./redux/reducers')
    console.log(143)
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
    console.log(144)

    server.removeListener('request', app)
    console.log(145)
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
    console.log(146)

    server.on('request', newApp)
    console.log(147)
    app = newApp
    console.log(148)
  })
  console.log(149)
}
console.log(150)
