let dummy = require('@nudj/dummy')
let schemas = require('@nudj/schemas')
let jsonServer = require('json-server')
let find = require('lodash/find')

let dummyData = dummy({
  companies: {
    schema: schemas.company,
    count: 5
  },
  jobs: {
    schema: schemas.job,
    count: 5
  },
  people: {
    schema: schemas.people,
    count: 5
  },
  referrals: {
    schema: schemas.referrals,
    count: 5
  },
  applications: {
    schema: {
      jobId: {
        example: {
          fn: 'choice',
          args: [['1']]
        }
      },
      personId: {
        example: {
          fn: 'choice',
          args: [['1']]
        }
      },
      referralId: {
        example: {
          fn: 'choice',
          args: [['1']]
        }
      }
    },
    count: 5
  }
})
dummyData.people = dummyData.people.concat([
  {
    id: '21',
    firstName: 'Nick',
    lastName: 'Collings',
    email: 'nick@nudj.co',
    urls: ['http://test.com/'],
    title: 'Tech Lead',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '22',
    firstName: 'Robyn',
    lastName: 'McGirl',
    email: 'robyn@nudj.co',
    urls: ['http://test.com/'],
    title: 'CEO',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '23',
    firstName: 'Jamie',
    lastName: 'Gunson',
    email: 'jamie@nudj.co',
    urls: ['http://test.com/'],
    title: 'Head of Product',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '24',
    firstName: 'Matt',
    lastName: 'Ellis',
    email: 'matt@nudj.co',
    urls: ['http://test.com/'],
    title: 'Design Wizard',
    type: 'external',
    company: 'nudj',
    status: 'user'
  }
])

let server = jsonServer.create()
let router = jsonServer.router(dummyData)
let middlewares = jsonServer.defaults()

server.use(middlewares)
server.get('/companies/:cid', (req, res, next) => {
  if (!req.params.cid.match(/^\d+$/)) {
    let company = find(dummyData.companies, {
      slug: req.params.cid
    })
    if (company) {
      res.json(company)
    } else {
      res.json({
        error: true,
        code: 404,
        errorMessage: 'no match'
      })
    }
  } else {
    next()
  }
})
server.get('/jobs/:jid', (req, res, next) => {
  if (!req.params.jid.match(/^\d+$/)) {
    let job = find(dummyData.jobs, {
      slug: req.params.jid
    })
    if (job) {
      res.json(job)
    } else {
      res.json({
        error: true,
        code: 404,
        errorMessage: 'no match'
      })
    }
  } else {
    next()
  }
})
server.get('/:type/first', (req, res, next) => {
  let type = req.params.type
  let match = find(dummyData[type], req.query)
  if (match) {
    res.json(match)
  } else {
    res.json({
      error: true,
      code: 404,
      errorMessage: 'no match'
    })
  }
})
server.use(router)

module.exports = server
