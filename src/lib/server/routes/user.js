let express = require('express')
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
let router = express.Router()

// Get the user profile
router.get('/', ensureLoggedIn, (req, res, next) => {
  res.render('user', { user: req.user })
})

module.exports = router
