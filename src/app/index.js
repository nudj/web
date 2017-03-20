let logger = require('./logger')

let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let cons = require('consolidate')

let requestRoutes = require('./routes/request')

let app = express()
app.engine('html', cons.lodash)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => res.render('index'))
app.get('/success', (req, res) => res.render('success'))
app.use('/request', requestRoutes)

app.use(function(req, res) {
  logger.log('warn', 'Page not found', req.url)
  res.status(404)
  if (req.accepts('html')) {
    res.render('404', { url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '404: Page not found' })
    return
  }
  res.type('txt').send('404: Page not found')
})

app.use(function(error, req, res, next) {
  logger.log('error', 'Application error', error)
  res.status(500)
  if (req.accepts('html')) {
    res.render('500', { url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '500: Internal server error' })
    return
  }
  res.type('txt').send('500: Internal server error')
})

app.listen(3000, () => logger.log('info', 'App running on http://localhost:3000/'))
