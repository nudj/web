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
    schema: Object.assign(schemas.job, {
      relatedJobs: {
        example: {
          fn: 'choice',
          args: [[ ['99'], ['100'] ]]
        }
      }
    }),
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
    relatedJobs: [ '100' ]
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
    relatedJobs: [ '99' ]
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
dummyData.externalMessages = [{
  hirerId: '21',
  jobId: '1',
  personId: '23',
  sentMessage: {
    composeMessage: "Hi {{recipient.firstname}},\n\nI hope this finds you well?\n\nI'm in need of a little favour and wondered whether you might be able to help. We're hiring at the moment and are looking for a new {{job.title}}. This is a really critical role for us, so it's important we find the right person. \n\nI really value your opinion so was wondering whether you know anyone in your network who it would be worth speaking to? They don't have to necessarily be actively looking for a job but would love to have a conversation with anyone who is even tentatively interested in finding out more. \n\nWe are using nudj to help it make it as easy for you as possible to refer. All you need to do is forward the job link below and we can track the referral. If they are successful we can reward you. \n\n{{job.link}}\n\nLet me know if you need any more info, absolutely no pressure but any help would be appreciated. \n\nKind Regards,\n{{sender.firstname}}",
    selectStyle: {
      type: 'professional',
      title: 'Professional',
      message: 'Stay classy.'
    },
    selectLength: {
      type: 'long',
      title: 'A bit more detail',
      message: 'For when you need to add extra info.'
    },
    sendMessage: {
      type: 'gmail',
      title: 'Send it via Gmail',
      message: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.'
    }
  }
}]
dummyData.referrals = [
  {
    id: '1',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    jobId: '1',
    personId: '23'
  },
  {
    id: '2',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    jobId: '1',
    personId: '22',
    parent: '1'
  }
]
dummyData.applications = [
  {
    id: '1',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    jobId: '1',
    personId: '24',
    referralId: '2'
  }
]

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
