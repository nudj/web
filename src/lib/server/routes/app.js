let express = require('express')
let nodeFetch = require('node-fetch')

let logger = require('../logger')
let build = require('../build').default
let router = express.Router()

function fetch (uri) {
  return nodeFetch(`http://api:81/${uri}`).then((response) => response.json())
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
        error: '404'
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
      error: '500'
    }
  })
  .then((data) => {
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
})

module.exports = router
