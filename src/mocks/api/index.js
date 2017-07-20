let mock = require('@nudj/api/mock')
let dummy = require('@nudj/dummy')
let schemas = require('@nudj/schemas')
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
    schema: schemas.applications,
    count: 5
  }
})
dummyData.companies = dummyData.companies.concat([
  {
    id: '99',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    industry: ['IT', 'Mining', 'Healthcare'],
    location: 'London',
    logo: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2F2a%2F89%2Fde%2F2a89dee5376d13e8d378e797d4e7e5fc.gif',
    name: 'Fake Company',
    slug: 'fake-company',
    url: 'http://omg.fake-company.com',
    description: 'OMG this job is SO hot right now. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.'
  }
])
dummyData.jobs = dummyData.jobs.concat([
  {
    id: '99',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Full-Stack Software Engineer',
    slug: 'senior-full-stack-software-engineer-2',
    url: 'https://bulb.workable.com/j/389500EB72',
    status: 'Open',
    bonus: 1000,
    description: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
    type: 'Permanent',
    remuneration: 'Competitive + Options',
    experience: '16 billion years',
    requirements: 'building large-scale web-based applications in 🐔, 💅🏼 and 💩.',
    templateTags: ['food'],
    tags: [
      'Software',
      'Developer',
      'Full-Stack'
    ],
    location: 'London',
    companyId: '2',
    related: [
      {
        companySlug: 'bulb',
        slug: 'operations-strategy-analyst',
        title: 'Operations Strategy Analyst',
        location: 'London'
      }
    ]
  },
  {
    id: '100',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Fake Test Job',
    slug: 'senior-fake-test-job',
    url: 'https://fake.com',
    status: 'Open',
    bonus: 1000,
    description: 'Fake job! vitae sodales velit ligula quis ligula. Sed et tincidunt nisi. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    type: 'Permanent',
    remuneration: 'Competitive + Options',
    experience: '300+ years',
    requirements: 'building large-scale web-based applications in 🐔, 💅🏼 and 💩.',
    templateTags: ['food', 'film'],
    tags: [
      'Fake',
      'Job'
    ],
    location: 'London',
    companyId: '99',
    related: [
      {
        companySlug: 'bulb',
        slug: 'operations-strategy-analyst',
        title: 'Operations Strategy Analyst',
        location: 'London',
        companyName: 'Fake Company'
      }
    ]
  }
])
dummyData.people = dummyData.people.concat([
  {
    id: '21',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Nick',
    lastName: 'Collings',
    email: 'nick@nudj.co',
    url: 'http://test.com/',
    title: 'Tech Lead',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '22',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Robyn',
    lastName: 'McGirl',
    email: 'robyn@nudj.co',
    url: 'http://test.com/',
    title: 'CEO',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '23',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Jamie',
    lastName: 'Gunson',
    email: 'jamie@nudj.co',
    url: 'http://test.com/',
    title: 'Head of Product',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '24',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Matt',
    lastName: 'Ellis',
    email: 'matt@nudj.co',
    url: 'http://test.com/',
    title: 'Design Wizard',
    type: 'external',
    company: 'nudj',
    status: 'user'
  },
  {
    id: '25',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'David',
    lastName: 'Platt',
    email: 'david@nudj.com',
    url: 'http://not-a-real-person.com',
    title: 'Senior Fake User',
    type: 'external',
    company: 'nudj',
    status: 'user'
  }
])

const server = mock.rest({
  data: dummyData,
  addCustomHandlers: (server) => {
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
    return server
  }
})

module.exports = server
