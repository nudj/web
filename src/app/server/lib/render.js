const get = require('lodash/get')
const getTime = require('date-fns/get_time')
const build = require('../build').default

function getRenderer (req, res, next) {
  return (data) => {
    delete req.session.logout
    delete req.session.returnTo
    let staticContext = build(data)
    if (staticContext.url) {
      res.redirect(staticContext.url)
    } else {
      let status = get(data, 'page.error.code', staticContext.status || 200)
      let person = get(data, 'page.person')
      res.status(status).render('app', {
        data: JSON.stringify(data),
        css: staticContext.css,
        html: staticContext.html,
        helmet: staticContext.helmet,
        intercom_app_id: `'${process.env.INTERCOM_APP_ID}'`,
        fullname: person && person.firstName && person.lastName && `'${person.firstName} ${person.lastName}'`,
        email: person && `'${person.email}'`,
        created_at: person && (getTime(person.created) / 1000)
      })
    }
  }
}

module.exports.getRenderer = getRenderer

function getRenderDataBuilder (req) {
  return (data) => {
    data.csrfToken = req.csrfToken()
    data.person = req.session.person
    if (req.session.message) {
      data.message = req.session.message
      delete req.session.message
    }
    data.url = {
      protocol: req.protocol,
      hostname: req.hostname,
      originalUrl: req.originalUrl
    }
    return {
      page: data
    }
  }
}

module.exports.getRenderDataBuilder = getRenderDataBuilder
