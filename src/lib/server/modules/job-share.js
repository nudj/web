let Mailgun = require('mailgun-js')
let logger = require('../lib/logger')
let intercom = require('../lib/intercom')
var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

module.exports.send = (firstName, lastName, email, link, surveyLink, companyName) => {
  logger.log('info', 'Sending email', firstName, lastName, email, link, surveyLink, companyName)
  intercom.createUniqueUserAndTag({
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
      event_name: 'completed survey',
      email: email,
      metadata: {
        survey: surveyLink,
        job_share_link: link
      }
    }))
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
