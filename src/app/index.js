let path = require('path')
let express = require('express')
var cons = require('consolidate')

let app = express()
app.engine('html', cons.lodash)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => res.render('index'))
app.get('/request', (req, res) => res.render('request'))
app.get('/success', (req, res) => res.render('success'))

app.listen(3000, () => console.log('App running on http://localhost:3000/'))
