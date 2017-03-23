let express = require('express')
let Sendmail = require('sendmail')

let logger = require('../logger')

let router = express.Router()
let sendmail = Sendmail({
  silent: false
})

router.get('/', (req, res) => res.render('request'))
router.post('/', (req, res) => {
  logger.log('info', 'Sending email', req.body)
  sendmail({
    from: 'hello@nudj.co',
    to: 'hello@nudj.co',
    subject: 'Request Access',
    html: `
      <html>
      <body>
        <br/>
        <p>Hi team,</p>
        <p>A new user has requested access.</p>
        <br/>
        <p>
          <strong>Full name:</strong> ${req.body.fullname}<br/>
          <strong>Email:</strong> ${req.body.email}<br/>
          <strong>Company Name:</strong> ${req.body.company_name}<br/>
        </p>
        <br/>
        <p>Love<br/> Your friendly nudj bot.</p>
        <br/>
      </body>
      </html>
    `
  }, (err, reply) => {
    if (err) {
      logger.log('Error', err)
      return res.render('request')
    }
    res.redirect('/success')
  })
})

module.exports = router