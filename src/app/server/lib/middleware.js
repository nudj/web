const createHash = require('hash-generator')
const {
  LogThenRedirect,
  LogThenNotFound,
  LogThenError
} = require('@nudj/framework/errors')

const job = require('../modules/job')

const validateJobUrl = (req, res, next) => {
  const [
    companySlug,
    jobSlug,
    referralId
  ] = req.params.companySlugJobSlugReferralId.split('+')

  if (!companySlug || !jobSlug) {
    return next(new LogThenNotFound('Invalid job url', req.originalUrl))
  }

  const request = referralId ? job.getReferralForJobInCompany({
    companySlug,
    jobSlug,
    referralId
  }) : job.getJobInCompany({
    companySlug,
    jobSlug
  })
  request.then(data => {
    if (
      !data.company ||
      !data.company.job ||
      (!!referralId && !data.referral) ||
      (!!referralId && data.referral.job.id !== data.company.job.id)
    ) {
      return next(new LogThenNotFound('Invalid job url', req.originalUrl))
    }
    next()
  })
  .catch(error => next(new LogThenError('Error validating url', error.message, req.params.companySlugJobSlugReferralId)))
}

const noDirectApplyNudj = (req, res, next) => {
  next(new LogThenRedirect('Unfortunately, you can’t access that page.', `/jobs/${req.params.companySlugJobSlugReferralId}`, req.originalUrl))
}

const cacheApplyNudjSecret = (req, res, next) => {
  req.session.applyNudjSecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.applyNudjSecret}`
  next()
}

const checkApplyNudjSecret = (req, res, next) => {
  if (req.params.secret !== req.session.applyNudjSecret) {
    delete req.session.applyNudjSecret
    noDirectApplyNudj(req, res, next)
  }
  next()
}

const deleteApplyNudjSecret = (req, res, next) => {
  delete req.session.applyNudjSecret
  delete req.session.returnTo
  next()
}

module.exports = {
  validateJobUrl,
  noDirectApplyNudj,
  cacheApplyNudjSecret,
  checkApplyNudjSecret,
  deleteApplyNudjSecret
}
