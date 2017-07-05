const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const customTypeDefs = require('./schema')
const customResolvers = require('./customResolvers')
const processCustomTypes = require('./processCustomTypes')

const schema = makeExecutableSchema(processCustomTypes(customTypeDefs, customResolvers))

var app = express()
app.use('/', bodyParser.json(), graphqlExpress({
  schema
}))
module.exports = app
