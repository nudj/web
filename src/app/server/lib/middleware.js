const createHash = require('hash-generator')
const {
  Redirect,
  NotFound,
  AppError
} = require('@nudj/framework/errors')
const { isAjax } = require('@nudj/framework/lib/lib')

const job = require('../modules/job')

const handleJobUrls = async (req, res, next) => {
  if (isAjax(req.originalUrl)) {
    return next()
  }

  let companySlug
  let jobSlug
  let referralLegacyId
  let referralSlug

  // extract parameter and query values
  if (req.params.companySlugJobSlugReferralId) {
    // LEGACY URL FORMAT: /jobs/:companySlugJobSlugReferralId
    const jobParams = req.params.companySlugJobSlugReferralId;
    [
      companySlug,
      jobSlug,
      referralLegacyId
    ] = jobParams.split('+')
  } else {
    // LEGACY QUERY STRING FORMAT: /companies/:companySlug/jobs/:jobSlug?referralId=:referralLegacyId
    referralLegacyId = req.query.referralId

    // CURRENT URL FORMAT: /companies/:companySlug/jobs/:jobSlug?referral=:referralSlug
    referralSlug = req.query.referral

    companySlug = req.params.companySlug
    jobSlug = req.params.jobSlug
  }

  try {
    if (!companySlug || !jobSlug) {
      return next(new NotFound('Invalid job url', req.originalUrl))
    }

    // if legacy url format, redirect to new url format
    if (referralLegacyId) {
      const response = await job.getReferralByLegacyId({
        referralLegacyId
      })
      if (response.referral) {
        return next(new Redirect({
          url: `/companies/${companySlug}/jobs/${jobSlug}?referral=${response.referral.slug}`
        }))
      } else {
        return next(new NotFound('Invalid job url', req.originalUrl))
      }
    }

    // fetch data based on params
    let data
    if (referralSlug) {
      data = await job.getReferralBySlugForJobInCompany({
        companySlug,
        jobSlug,
        referralSlug
      })
    } else {
      data = await job.getJobInCompany({
        companySlug,
        jobSlug
      })
    }

    // double check company, job and referral are genuine relations
    if (
      !data.company ||
      !data.company.job ||
      (referralSlug && (!data.referral || data.referral.job.id !== data.company.job.id))
    ) {
      return next(new NotFound('Invalid job url', req.originalUrl))
    }

    next()
  } catch (error) {
    next(new AppError('Error validating url', error.message, companySlug, jobSlug, referralSlug))
  }
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
  const queryString = req.originalUrl.substring(req.path.length)
  req.session.applyNudjSecret = createHash(8)
  req.session.returnTo = `${req.path}/${req.session.applyNudjSecret}${queryString}`
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
