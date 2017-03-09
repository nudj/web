let express = require('express')
let build = require('../build').default

let router = express.Router()

router.get('*', (req, res) => {
  let data = {
    page: {
      job: {
        title: `Job title ${req.path.split('/')[2]}`,
        location: 'Location 1',
        salary: 'Salary 1',
        url: '#jobUrl',
        company: {
          url: '#companyUrl'
        },
        related: [
          {
            id: 2,
            title: 'Job title 2',
            location: 'Location 2'
          },
          {
            id: 3,
            title: 'Job title 3',
            location: 'Location 3'
          },
          {
            id: 4,
            title: 'Job title 4',
            location: 'Location 4'
          }
        ]
      }
    }
  }
  let renderResult = build(data, req.url)
  console.log('renderResult', renderResult)
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
