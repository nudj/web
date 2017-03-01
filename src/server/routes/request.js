let express = require('express')
let Sendmail = require('sendmail')

let router = express.Router()
let sendmail = Sendmail({
  silent: true
})

router.get('/', (req, res) => res.render('request'))
router.post('/', (req, res) => {
  console.log('Sending email', req.body)
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
    `,
  }, function(err, reply) {
    if (err) {
      console.error(err)
      return res.render('request', req.body)
    }
    res.redirect('/success')
  })
})

module.exports = router
