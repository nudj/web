let Mailgun = require('mailgun-js')
let logger = require('../lib/logger')
let intercom = require('../lib/intercom')
var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

function recordEvent (firstName, lastName, email, companyName, metadata, eventName) {
  return intercom.createUniqueUserAndTag({
    name: `${firstName} ${lastName}`,
    email,
    companies: [
      {
        company_id: companyName.toLowerCase().split(' ').join('-'),
        name: companyName
      }
    ]
  }, 'team-member')
    .then(() => intercom.logEvent({
      event_name: eventName,
      email: email,
      metadata: metadata
    }))
}

module.exports.send = (firstName, lastName, email, link, surveyLink, companyName) => {
  logger.log('info', 'Sending email', firstName, lastName, email, link, surveyLink, companyName)
  const metadata = {
    survey: surveyLink,
    job_share_link: link
  }
  const eventName = 'completed survey'
  recordEvent(firstName, lastName, email, companyName, metadata, eventName)
  return mailgun
    .messages()
    .send({
      from: 'hello@nudj.co',
      to: email,
      subject: 'Ready to share your company\'s jobs?',
      html: `
        <html>
        <body>
          <br/>
          <p>Hi ${firstName},</p>
          <p>A description of what this screen is for - thanking them for completing the survey and then getting them to share.</p>
          <br/>
          <p>
            <a href='${link}'>${link}</a>
          </p>
          <br/>
          <p>Love<br/> from Nudj.</p>
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

module.exports.viewed = (firstName, lastName, email, companyName, link) => {
  const metadata = {
    job_share_link: link
  }
  const eventName = 'viewed job share page'
  return recordEvent(firstName, lastName, email, companyName, metadata, eventName)
}
