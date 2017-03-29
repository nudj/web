let express = require('express')
let nodeFetch = require('node-fetch')

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

router.get('/:companySlug/:jobSlugId', (req, res) => {
  let companySlug = req.params.companySlug
  let jobSlug = req.params.jobSlugId.split('+')[0]
  let jobId = req.params.jobSlugId.split('+')[1]
  let refId = req.query.ref
  Promise.all([
    fetch(`companies/${companySlug}`),
    fetch(`jobs/${jobId}`),
    fetch(`people/${refId}`)
  ])
  .then(([
    company,
    job,
    referrer
  ]) => {
    // ensure a valid url
    if (company.id !== job.companyId || jobSlug !== job.slug) {
      return {
        error: '404'
      }
    }
    return {
      page: {
        company,
        job,
        referrer
      }
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
      return res.render('app', {
        data: JSON.stringify(data),
        html: renderResult
      })
    }
  })
})

module.exports = router
