let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let cons = require('consolidate')

let requestRoutes = require('./routes/request')
let appRoutes = require('./routes/app')

let app = express()
app.engine('html', cons.lodash)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => res.render('index'))
app.get('/success', (req, res) => res.render('success'))
app.use('/request', requestRoutes)
app.use('/app', appRoutes)

app.use(function(req, res){
  res.status(404)
  if (req.accepts('html')) {
    res.render('404', { url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '404: Page not found' })
    return;
  }
  res.type('txt').send('404: Page not found')
})

app.use(function(error, req, res, next){
  res.status(500)
  if (req.accepts('html')) {
    res.render('500', { url: req.url })
    return
  }
  if (req.accepts('json')) {
    res.send({ error: '500: Internal server error' })
    return;
  }
  res.type('txt').send('500: Internal server error')
})

if (process.env.NODE_ENV !== 'production') {
  let mockApi = require('../../mocks/api')
  mockApi.listen(3001, () => console.log('JSON Server is running'))
}

app.listen(3000, () => console.log('App running on http://localhost:3000/'))
