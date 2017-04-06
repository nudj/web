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
    res.redirect(renderResult.url)
  } else {
    return res.render('app', {
      data: JSON.stringify(data),
      html: renderResult
    })
  }
})

let nudjHandler = (req, res) => {
  let company, referral, job, referrer
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugRefId.split('+')[0]
  let refId = req.params.jobSlugRefId.split('+')[1]
  let initialRequests = [
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobSlug}`),
    fetch(`people/first?email=${req.user._json.email}`)
  ]
  if (refId) {
    initialRequests.push(fetch(`referrals/${refId}`))
  }
  Promise.all(initialRequests).then(([
    fetchedCompany,
    fetchedJob,
    fetchedPerson,
    fetchedReferral
  ]) => {
    company = fetchedCompany
    job = fetchedJob
    referrer = fetchedPerson
    referral = fetchedReferral

    return fetch(`referrals/first?jobId=${job.id}&personId=${referrer.id}`)
  })
  .then((fetchedReferral) => {
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
      (referral && referral.code === 404) ||
      referrer.code === 404 ||
      job.code === 404 ||
      company.id !== job.companyId ||
      (referral && referral.jobId !== job.id)
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
        referralId: referral ? referral.id : null
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
  .then((newReferral) => {
    if (newReferral.message) {
      req.session.message = newReferral.message
      res.redirect(`/${company.slug}/${job.slug}${referral ? `+${referral.id}` : ''}`)
    } else {
      let data = {
        user: req.user,
        page: {
          company,
          job,
          referrer,
          referral: newReferral
        }
      }
      let renderResult = build(data, req.url)
      if (renderResult.url) {
        res.redirect(renderResult.url)
      } else {
        res.render('app', {
          data: JSON.stringify(data),
          html: renderResult
        })
      }
    }
  })
}
router.get('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)
router.post('/:companySlug/:jobSlugRefId/nudj', ensureLoggedIn, nudjHandler)

let applicationHandler = (req, res) => {
  let company, referral, job, applicant
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugRefId.split('+')[0]
  let refId = req.params.jobSlugRefId.split('+')[1]
  let initialRequests = [
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobSlug}`),
    fetch(`people/first?email=${req.user._json.email}`)
  ]
  if (refId) {
    initialRequests.push(fetch(`referrals/${refId}`))
  }
  Promise.all(initialRequests).then(([
    fetchedCompany,
    fetchedJob,
    fetchedPerson,
    fetchedReferral
  ]) => {
    company = fetchedCompany
    job = fetchedJob
    applicant = fetchedPerson
    referral = fetchedReferral

    return fetch(`applications/first?jobId=${job.id}&personId=${applicant.id}`)
  })
  .then((fetchedApplication) => {
    // ensure person hasn't already referred this job
    if (fetchedApplication.code !== 404) {
      return {
        message: {
          type: 'error',
          message: 'Already applied'
        }
      }
    }
    // ensure this is a valid referral url
    if (
      company.code === 404 ||
      (referral && referral.code === 404) ||
      applicant.code === 404 ||
      job.code === 404 ||
      company.id !== job.companyId ||
      (referral && referral.jobId !== job.id)
    ) {
      return {
        message: {
          type: 'error',
          message: 'Invalid data'
        }
      }
    }
    // create new application
    return fetch(`applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId: job.id,
        personId: applicant.id,
        referralId: referral ? referral.id : null
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
  .then((application) => {
    if (application.message) {
      req.session.message = application.message
      res.redirect(`/${company.slug}/${job.slug}${referral ? `+${referral.id}` : ''}`)
    } else {
      let data = {
        user: req.user,
        page: {
          company,
          job,
          applicant,
          application
        }
      }
      let renderResult = build(data, req.url)
      if (renderResult.url) {
        res.redirect(renderResult.url)
      } else {
        res.render('app', {
          data: JSON.stringify(data),
          html: renderResult
        })
      }
    }
  })
}
router.get('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applicationHandler)
router.post('/:companySlug/:jobSlugRefId/apply', ensureLoggedIn, applicationHandler)

router.get('/:companySlug/:jobSlugRefId', (req, res) => {
  let company, referral, job, referrer
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugRefId.split('+')[0]
  let refId = req.params.jobSlugRefId.split('+')[1]
  let initialRequests = [
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobSlug}`)
  ]
  if (refId) {
    initialRequests.push(fetch(`referrals/${refId}`))
  }

  Promise.all(initialRequests).then(([
    fetchedCompany,
    fetchedJob,
    fetchedReferral
  ]) => {
    company = fetchedCompany
    job = fetchedJob
    referral = fetchedReferral

    if (referral) {
      return fetch(`people/${referral.personId}`)
    } else {
      return Promise.resolve()
    }
  })
  .then((fetchedPerson) => {
    referrer = fetchedPerson
    // ensure a valid url
    if (company.id !== job.companyId || (referral && referral.jobId !== job.id)) {
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
      res.redirect(renderResult.url)
    } else {
      res.render('app', {
        data: JSON.stringify(data),
        html: renderResult
      })
    }
  })
  .catch((error) => logger.log('error', error))
})

router.get('*', (req, res) => {
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

module.exports = router
