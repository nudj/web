let express = require('express')
let fetch = require('node-fetch')

let build = require('../build').default
let router = express.Router()

router.get('*', (req, res) => {

  fetch('http://127.0.0.1:3001/jobs/1')
    .then((response) => response.json())
    .then((job) => {
      let data = {
        page: {
          job
        }
      }
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
