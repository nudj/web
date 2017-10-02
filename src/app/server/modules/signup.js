let Mailgun = require('mailgun-js')
let logger = require('@nudj/framework/logger')
let intercom = require('../lib/intercom')
var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

module.exports.send = (firstName, lastName, email, jobTitle, role) => {
  logger.log('info', 'Sending email', firstName, lastName, email, jobTitle, role)
  intercom.createUniqueLeadAndTag({
    name: `${firstName} ${lastName}`,
    email,
    custom_attributes: {
      job_title: jobTitle,
      role
    }
  }, 'nudjee')
  return mailgun
    .messages()
    .send({
      from: 'hello@nudj.co',
      to: 'hello@nudj.co',
      subject: 'Sign-up for Updates',
      html: `
        <html>
        <body>
          <br/>
          <p>Hi team,</p>
          <p>A new user has requested access.</p>
          <br/>
          <p>
            <strong>Full name:</strong> ${firstName} ${lastName}<br/>
            <strong>Email:</strong> ${email}<br/>
            <strong>Job Title:</strong> ${jobTitle}<br/>
            <strong>Role(s):</strong> ${role}<br/>
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
