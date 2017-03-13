let dummy = require('@nudj/dummy')
let schemas = require('@nudj/schemas')
let jsonServer = require('json-server')

let server = jsonServer.create()
let router = jsonServer.router(dummy({
  companies: {
    schema: schemas.company,
    count: 5
  },
  jobs: {
    schema: schemas.job,
    count: 20
  }
}))
let middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(jsonServer.rewriter({
  '/jobs/:jid': '/jobs/:jid?_expand=company'
}))
server.use(router)

module.exports = server
