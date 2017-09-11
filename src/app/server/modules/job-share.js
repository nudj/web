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
      from: 'The nudj team <hello@nudj.co>',
      to: email,
      subject: `Thanks for completing the survey ${firstName}, now it's time to share!`,
      html: `
        <html>
        <body>
          <p>Hi ${firstName},</p>
          <p>Thanks for completing the survey!</p>
          <p>Your unique and trackable links for your company's jobs for you to share with those you recommended, can be found <strong><a href='${link}'>here</a>.</strong></p>
          <p>These will ensure that if someone you recommend is successful then you'll get the bonus on offer. It will also ensure that if anyone you send them to refers a new hire, then you'll both get rewarded!</p>
          <p>Happy sharing!</p>
          <p>The nudj team (on behalf of ${companyName})</p>
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
