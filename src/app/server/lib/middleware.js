const createHash = require('hash-generator')
const {
  Redirect,
  NotFound,
  AppError
} = require('@nudj/framework/errors')
const { isAjax } = require('@nudj/framework/lib/lib')

const job = require('../modules/job')

const handleJobUrls = (req, res, next) => {
  if (isAjax(req.originalUrl)) {
    return next()
  }
  if (req.params.companySlugJobSlugReferralId) {
    const jobParams = req.params.companySlugJobSlugReferralId
    // Legacy Url
    const [
      companySlug,
      jobSlug,
      referralId
    ] = jobParams.split('+')
    const query = referralId ? `?referralId=${referralId}` : ''
    const path = req.originalUrl.split(jobParams)[1] || ''

    next(new Redirect({
      url: `/companies/${companySlug}/jobs/${jobSlug}${path}${query}`
    }))
  }

  const { companySlug, jobSlug } = req.params
  const { referralId } = req.query

  if (!companySlug || !jobSlug) {
    return next(new NotFound('Invalid job url', req.originalUrl))
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
      return next(new NotFound('Invalid job url', req.originalUrl))
    }
    next()
  })
  .catch(error => {
    next(new AppError('Error validating url', error.message, companySlug, jobSlug, referralId))
  })
}

const noDirectApplyNudj = (req, res, next) => {
  next(new Redirect({
    url: `/companies/${req.params.companySlug}/jobs/${req.params.jobSlug}`,
    notification: {
      type: 'error',
      message: 'Unfortunately, you can’t access that page.'
    }
  }, 'User attempted to access job url directly', req.originalUrl))
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
  handleJobUrls,
  noDirectApplyNudj,
  cacheApplyNudjSecret,
  checkApplyNudjSecret,
  deleteApplyNudjSecret
}
