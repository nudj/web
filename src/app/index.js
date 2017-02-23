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

app.listen(3000, () => console.log('App running on http://localhost:3000/'))
