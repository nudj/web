let express = require('express')
let Sendmail = require('sendmail')
let Intercom = require('intercom-client')
let client = new Intercom.Client({
    token: process.env.INTERCOM_ACCESS_TOKEN
})

let logger = require('../logger')

let router = express.Router()
let sendmail = Sendmail({
    silent: true
})

router.get('/', (req, res) => res.render('request'))
router.post('/', (req, res) => {
    logger.log('info', 'Sending email', req.body)
    sendmail({
        from: 'hello@nudj.co',
        to: 'jamie@nudj.co',
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
    }, (err, reply) => {
        if (err) {
            logger.log('Error', err)
            return res.render('request')
        }
        logger.log('info', 'Sending Lead to Intercom')
        client.leads.create({
            name: req.body.fullname,
            email: req.body.email,
            custom_attributes: {
              company: req.body.company_name
            }
        }, function(err, response) {
            if (err) {
                logger.log('Error', err)
                return res.render('request')
            }
            res.redirect('/success')
        })
    })
})

module.exports = router
