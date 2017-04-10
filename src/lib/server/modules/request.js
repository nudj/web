let Mailgun = require('mailgun-js')
let logger = require('../lib/logger')

var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

module.exports.send = (fullName, email, companyName) => {
  logger.log('info', 'Sending email', fullName, email, companyName)
  return mailgun
    .messages()
    .send({
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
            <strong>Full name:</strong> ${fullName}<br/>
            <strong>Email:</strong> ${email}<br/>
            <strong>Company Name:</strong> ${companyName}<br/>
          </p>
          <br/>
          <p>Love<br/> Your friendly nudj bot.</p>
          <br/>
        </body>
        </html>
      `
    })
    .then((reply) => {
      logger.log('info', 'Mailer response', reply)
      return {
        success: true
      }
    })
}
