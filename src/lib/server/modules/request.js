let Mailgun = require('mailgun-js')

var mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

module.exports.send = (data, cb) => {
  mailgun.messages().send(data, cb)
}
