let dummy = require('@nudj/dummy')
let schemas = require('@nudj/schemas')
let jsonServer = require('json-server')

let jsonserver = jsonServer.create()
let router = jsonServer.router(dummy({
  companies: {
    schema: schemas.company,
    count: 3
  }
}))
let middlewares = jsonServer.defaults()
jsonserver.use(middlewares)
jsonserver.use(router)

module.exports = jsonserver
