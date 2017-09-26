const logger = require('@nudj/framework/logger')

const errorAlreadyReferredApplied = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: error.message
  }
  let destination = req.originalUrl.split('/')
  logger.log('error', error.message, req.method, req.params, destination.pop(), error)
  destination = destination.join('/')
  res.redirect(destination)
}
const errorInvalidToken = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: error.message
  }
  logger.log('error', error.message, req.method, req.params, error)
  res.redirect('/')
}
const noDirectApply = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: 'Unfortunately you can\'t access that URL directly, please select the apply button below.'
  }
  res.redirect(`/jobs/${error.companySlugJobSlugRefId}`)
}
const noDirectNudj = (req, res, next, error) => {
  req.session.notification = {
    type: 'error',
    message: 'Unfortunately you can\'t access that URL directly, please select the nudj button below.'
  }
  res.redirect(`/jobs/${error.companySlugJobSlugRefId}`)
}

module.exports = {
  'Already referred': errorAlreadyReferredApplied,
  'Already applied': errorAlreadyReferredApplied,
  'Invalid token': errorInvalidToken,
  'No direct apply': noDirectApply,
  'No direct nudj': noDirectNudj
}
