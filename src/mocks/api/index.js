let dummy = require('@nudj/dummy')
let schemas = require('@nudj/schemas')
let jsonServer = require('json-server')
let find = require('lodash/find')

let dummyData = dummy({
  companies: {
    schema: schemas.company,
    count: 20
  },
  jobs: {
    schema: schemas.job,
    count: 20
  },
  people: {
    schema: schemas.people,
    count: 20
  }
})

let server = jsonServer.create()
let router = jsonServer.router(dummyData)
let middlewares = jsonServer.defaults()

server.use(middlewares)
server.get('/companies/:cid', (req, res, next) => {
  if (!req.params.cid.match(/^\d+$/)) {
    console.log('Found slug')
    let company = find(dummyData.companies, {
      slug: req.params.cid
    })
    console.log('match', company)
    if (company) {
      res.json(company)
    } else {
      res.status(404).json({})
    }
  } else {
    next()
  }
})
server.use(router)

module.exports = server
