let logger = require('./lib/logger')

let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let cons = require('consolidate')
let session = require('express-session')
let passport = require('passport')
let Auth0Strategy = require('passport-auth0')

let authRoutes = require('./routes/auth')
let appRoutes = require('./routes/app')

let strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || '/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile)
})
passport.use(strategy)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

let app = express()
app.engine('html', cons.lodash)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(session({
  secret: 'nudj-session-secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)
app.use(appRoutes)

app.use((req, res) => {
  logger.log('warn', 'Page not found', req.url)
  res.status(404)
  if (req.accepts('html')) {
    res.render({ url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '404: Page not found' })
    return
  }
  res.type('txt').send('404: Page not found')
})

app.use((error, req, res, next) => {
  logger.log('error', 'Application error', error)
  res.status(500)
  if (req.accepts('html')) {
    res.render({ url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '500: Internal server error' })
    return
  }
  res.type('txt').send('500: Internal server error')
})

if (process.env.NODE_ENV !== 'production') {
  let mockApi = require('../../mocks/api')
  mockApi.listen(81, () => logger.log('info', 'Mock API running'))
}

app.listen(80, () => logger.log('info', 'App running'))
