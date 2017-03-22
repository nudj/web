let express = require('express')
let passport = require('passport')

let router = express.Router()

router.get('/', (req, res) => res.render('index'))
router.get('/success', (req, res) => res.render('success'))

// Render the login template
router.get('/login', (req, res) => {
  res.render('login', { env: process.env })
})

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null')
    }
    res.redirect('/')
  }
)

router.get('/login',
  passport.authenticate('auth0', {}), function (req, res) {
  res.redirect('/')
})

module.exports = router
