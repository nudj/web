let express = require('express')
let passport = require('passport')

let router = express.Router()

router.get('/success', (req, res) => res.render('success'))

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null')
    }
    res.redirect('/')
  }
)

router.get('/login', passport.authenticate('auth0', {}), (req, res) => res.redirect('/'))

module.exports = router
