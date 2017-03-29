let express = require('express')
let nodeFetch = require('node-fetch')
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

let logger = require('../logger')
let build = require('../build').default
let router = express.Router()

function fetch (uri, options) {
  return nodeFetch(`http://api:81/${uri}`, options).then((response) => response.json())
}

router.get('/', (req, res) => {
  let data = {page: {}}
  let renderResult = build(data, req.url)
  if (renderResult.url) {
    res.writeHead(302, {
      Location: renderResult.url
    })
    res.end()
  } else {
    return res.render('app', {
      data: JSON.stringify(data),
      html: renderResult
    })
  }
})

router.get('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, (req, res) => {
  let company, referral, job, referrer
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugRefId.split('+')[0]
  let refId = req.params.jobSlugRefId.split('+')[1]
  Promise.all([
    fetch(`companies/${companySlug}`),
    fetch(`referrals/${refId}`),
    fetch(`people/first?email=${req.user._json.email}`)
  ])
  .then(([
    fetchedCompany,
    fetchedReferral,
    fetchedPerson
  ]) => {
    company = fetchedCompany
    referral = fetchedReferral
    referrer = fetchedPerson
    return Promise.all([
      fetch(`jobs/${referral.jobId}`),
      fetch(`referrals/first?jobId=${referral.jobId}&personId=${referrer.id}`)
    ])
  })
  .then(([
    fetchedJob,
    fetchedReferral
  ]) => {
    job = fetchedJob
    // ensure person hasn't already referred this job
    if (fetchedReferral.code !== 404) {
      return {
        message: {
          type: 'error',
          message: 'Already referred'
        }
      }
    }
    // ensure this is a valid referral url
    if (
      company.code === 404 ||
      referral.code === 404 ||
      referrer.code === 404 ||
      job.code === 404 ||
      company.id !== job.companyId ||
      jobSlug !== job.slug
    ) {
      return {
        message: {
          type: 'error',
          message: 'Invalid data'
        }
      }
    }
    // create new referral
    return fetch(`referrals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId: job.id,
        personId: referrer.id,
        referralId: referral.id
      })
    })
  })
  .catch((error) => {
    logger.log('error', error)
    return {
      message: {
        type: 'error',
        message: 'Something went wrong'
      }
    }
  })
  .then((data) => {
    if (data.message) {
      req.session.message = data.message
      res.redirect(`/${company.slug}/${job.slug}+${referral.id}`)
    } else {
      res.redirect(`/${company.slug}/${job.slug}+${data.id}`)
    }
  })
})

router.get('/:companySlug/:jobSlugRefId', (req, res) => {
  let company, referral, job, referrer
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugRefId.split('+')[0]
  let refId = req.params.jobSlugRefId.split('+')[1]
  Promise.all([
    fetch(`companies/${companySlug}`),
    fetch(`referrals/${refId}`)
  ])
  .then(([
    fetchedCompany,
    fetchedReferral
  ]) => {
    company = fetchedCompany
    referral = fetchedReferral
    return Promise.all([
      fetch(`jobs/${referral.jobId}`),
      fetch(`people/${referral.personId}`)
    ])
  })
  .then(([
    fetchedJob,
    fetchedPerson
  ]) => {
    job = fetchedJob
    referrer = fetchedPerson
    // ensure a valid url
    if (company.id !== job.companyId || jobSlug !== job.slug) {
      return {
        error: {
          code: 404,
          message: 'Not found'
        }
      }
    }
    return {
      page: {
        company,
        referral,
        job,
        referrer
      }
    }
  })
  .catch((error) => {
    logger.log('error', error)
    return {
      error: {
        code: 500,
        message: 'Something went wrong :('
      }
    }
  })
  .then((data) => {
    data.user = req.user
    if (req.session.message) {
      data.message = req.session.message
      delete req.session.message
    }
    let renderResult = build(data, req.url)
    if (renderResult.url) {
      res.writeHead(302, {
        Location: renderResult.url
      })
      res.end()
    } else {
      res.render('app', {
        data: JSON.stringify(data),
        html: renderResult
      })
    }
  })
  .catch((error) => logger.log('error', error))
})

module.exports = router
