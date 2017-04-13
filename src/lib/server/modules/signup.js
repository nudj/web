let Mailgun = require('mailgun-js')
let Intercom = require('intercom-client')
let logger = require('../lib/logger')
var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})
let intercom = new Intercom.Client({
  token: process.env.INTERCOM_ACCESS_TOKEN
})

module.exports.send = (firstName, lastName, email, jobTitle, role) => {
  logger.log('info', 'Sending email', firstName, lastName, email, jobTitle, role)
  intercom.leads
    .listBy({ email })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Intercom gone done broke: ${response.status}`)
      }
      return response.body
    })
    .then((result) => !!result.total_count)
    .then((exists) => {
      if (!exists) {
        logger.log('info', 'Creating new lead', firstName, lastName, email, jobTitle, role)
        intercom.leads.create({
          name: `${firstName} ${lastName}`,
          email,
          custom_attributes: {
            job_title: jobTitle,
            role
          }
        })
      }
    })
    .catch((error) => logger.log('error', 'Intercom', error))
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
