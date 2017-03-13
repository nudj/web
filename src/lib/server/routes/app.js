let express = require('express')
let fetch = require('node-fetch')

let build = require('../build').default
let router = express.Router()

router.get('*', (req, res) => {
  let path = req.path.split('/')
  let dataPromise
  if (path.length === 3 && path[1] === 'jobs') {
    dataPromise = fetch(`http://api:3001/jobs/${path[2]}`)
      .then((response) => response.json())
      .then((job) => ({
        page: {
          job
        }
      }))
  } else {
    dataPromise = Promise.resolve({})
  }
  dataPromise.then((data) => {
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
