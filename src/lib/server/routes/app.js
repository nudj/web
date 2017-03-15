let express = require('express')
let nodeFetch = require('node-fetch')

let build = require('../build').default
let router = express.Router()

function fetch (uri) {
  return nodeFetch(`http://api:3001/${uri}`).then((response) => response.json())
}

router.get('/:companySlug/:jobSlugId', (req, res) => {
  let jobId = req.params.jobSlugId.split('+')[1]
  let companySlug = req.params.companySlug
  let refId = req.query.ref
  Promise.all([
    fetch(`jobs/${jobId}`),
    fetch(`companies/${companySlug}`),
    fetch(`people/${refId}`)
  ])
  .then(([
    job,
    company,
    referrer
  ]) => {
    return {
      page: {
        job,
        company,
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
