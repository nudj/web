const data = {
  companies: [],
  jobs: [],
  people: [],
  referrals: [],
  applications: [],
  hirers: [],
  externalMessages: [],
  messages: [],
  recommendations: [],
  employees: [],
  surveys: [],
  tasks: [],
  tokens: [],
  employeeSurveys: []
}
data.messages = data.messages.concat([
  {
    id: '33',
    providerId: '500',
    conversation: '42',
    pixelToken: 'uniquepixelhash',
    readCount: 0
  }
])
data.companies = data.companies.concat([
  {
    id: '99',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    industry: 'IT',
    location: 'London',
    logo: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2F2a%2F89%2Fde%2F2a89dee5376d13e8d378e797d4e7e5fc.gif',
    name: 'Fake Company',
    mission: 'make America fake again',
    slug: 'fake-company',
    url: 'http://omg.fake-company.com',
    description: 'OMG this job is SO hot right now. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.'
  },
  {
    id: '100',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    industry: 'Dollar',
    location: 'Chicago, Bitch',
    mission: 'make a lot of dollar',
    logo: 'https://68.media.tumblr.com/23f73d0a9a8b9b72eb87dad9f67629df/tumblr_n215bstSum1qdewlro2_r1_250.gif',
    name: 'sales-i',
    slug: 'sales-i',
    url: 'http://omg.fake-company.com',
    description: 'OMG this job is SO hot right now. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.'
  },
  {
    industry: 'Recruitment',
    location: 'London, UK',
    logo: 'https://www.nudj.co/assets/images/nudj-logo.png',
    name: 'Nudj',
    mission: 'change the way companies hire',
    slug: 'nudj',
    size: 'SME',
    url: 'https://www.nudj.co/',
    description: 'Nudj is changing the way companies find and hire awesome people. This is an opportunity to join a small, but passionate team, who are on a mission to change hiring for good.',
    facebook: 'https://twitter.com/nudjhq',
    twitter: 'https://www.facebook.com/nudj.co',
    linkedin: 'https://www.linkedin.com/company/the-nudge-app',
    id: '101',
    modified: '2017-09-25T09:40:09.948+00:00',
    onboarded: false
  }
])
data.jobs = data.jobs.concat([
  {
    id: '99',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Full-Stack Software Engineer',
    slug: 'senior-full-stack-software-engineer-2',
    url: 'https://bulb.workable.com/j/389500EB72',
    status: 'PUBLISHED',
    bonus: 1000,
    description: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
    roleDescription: 'Managing all the software, dropping the database, deleting important sections of code, force-pushing to master and of course spilling coffee on everyone\'s laptop.',
    candidateDescription: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
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
    company: '99',
    relatedJobs: [
      '100'
    ],
    viewCount: 0
  },
  {
    id: '100',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Senior Fake Test Job',
    slug: 'senior-fake-test-job',
    url: 'https://fake.com',
    status: 'PUBLISHED',
    bonus: 1000,
    description: 'Fake job! vitae sodales velit ligula quis ligula. Sed et tincidunt nisi. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    roleDescription: 'Managing all the software, dropping the database, deleting important sections of code, force-pushing to master and of course spilling coffee on everyone\'s laptop.',
    candidateDescription: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
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
    company: '99',
    relatedJobs: [
      '99'
    ],
    viewCount: 0
  },
  {
    id: '101',
    title: 'Marketing Coordinator',
    slug: 'marketing-coordinator',
    url: 'https://www.linkedin.com/jobs/view/400601679/',
    status: 'PUBLISHED',
    bonus: 1000,
    description: 'Sales-i’s cloud based, sales performance software help good sales people become great ones. This fast growing tech company needs a marketeer to join the Chicago team. Help woo new clients and show some love to their existing ones. To do so you’ll be diving into the world of digital, print and creative thinking. You’ll have a few years of B2B marketing under your belt, be a master of crafting engaging content and know your way around the go-to marketing tools. Rumour has it they are moving downtown, so don’t worry, you won’t need to schlep out to the ‘burbs.',
    roleDescription: 'Managing all the software, dropping the database, deleting important sections of code, force-pushing to master and of course spilling coffee on everyone\'s laptop.',
    candidateDescription: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
    type: 'Permanent',
    remuneration: 'competitive',
    experience: '3 years',
    tags: [
      'developer',
      'front-end',
      'software',
      'node.js'
    ],
    location: 'Chicago, IL',
    company: '100',
    relatedJobs: [],
    templateTags: ['film'],
    created: '2017-07-27T12:00:00.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    viewCount: 0
  },
  {
    id: '102',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    title: 'Full Stack Software Engineer',
    slug: 'full-stack-software-engineer',
    url: 'https://fake.com',
    status: 'PUBLISHED',
    bonus: 1000,
    roleDescription: 'Fake job! vitae sodales velit ligula quis ligula. Sed et tincidunt nisi. Ut nec massa vitae dui ullamcorper malesuada nec in neque. Suspendisse nec sapien faucibus, mollis metus ac, tempus eros. Praesent at nisl consequat ligula auctor eleifend nec sit amet eros. Fusce consequat, ante ac maximus auctor, felis justo vestibulum elit, congue congue ipsum ligula et lacus. Vivamus est risus, viverra quis iaculis et, eleifend eget est.',
    candidateDescription: '5+ years software engineering experience, using Node (6+), ES6 (Babel) and TypeScript. You should also be familiar with Git, Github, PRs, Code Reviews - please send us a link to your Github profile.',
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
    company: '101',
    relatedJobs: [
      '99'
    ],
    viewCount: 0
  }
])
data.people = data.people.concat([
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
  },
  {
    id: '26',
    created: '1986-07-06T07:34:54.000+00:00',
    modified: '2000-01-17T02:51:58.000+00:00',
    firstName: 'Tim',
    lastName: 'Robinson',
    email: 'tim@nudj.co',
    url: 'http://test.com/',
    title: 'Junior Fake User',
    type: 'external',
    company: 'nudj',
    status: 'user'
  }
])
data.referrals = data.referrals.concat([
  {
    id: '1',
    job: '100',
    person: '25',
    parent: null,
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  }
])
data.applications = data.applications.concat([
  {
    id: '1',
    job: '100',
    person: '25',
    referral: '1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  }
])
data.employees = data.employees.concat([
  {
    id: 'employee1',
    person: '21',
    company: '99',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  },
  {
    id: 'employee2',
    person: '26',
    company: '99',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00'
  }
])
data.surveys = data.surveys.concat([
  {
    id: 'survey1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    company: '99',
    link: 'https://nudj.typeform.com/to/Yvnb4E',
    uuid: 'Yvnb4E',
    type: 'EMPLOYEE_SURVEY'
  },
  {
    id: 'survey2',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    company: '99',
    link: 'https://nudj.typeform.com/to/ST7ltK',
    uuid: 'ST7ltK',
    type: 'HIRER_SURVEY'
  }
])
data.tokens = data.tokens.concat([
  {
    data: {
      employeeSurvey: 'employeeSurvey1'
    },
    token: 'NICEFATHASH',
    type: 'SURVEY_TYPEFORM_COMPLETE',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    id: '1'
  },
  {
    data: {
      employeeSurvey: 'employeeSurvey2'
    },
    token: 'NICEFATHASH1',
    type: 'SURVEY_TYPEFORM_COMPLETE',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    id: '2'
  },
  {
    data: {
      employeeSurvey: 'employeeSurvey2'
    },
    token: 'r7cn4u29ypubdr3j',
    type: 'SURVEY_TYPEFORM_COMPLETE',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    id: '12'
  },
  {
    data: {
      employeeSurvey: 'employeeSurvey2'
    },
    token: 'NICEFATHASH2',
    type: 'SHARE_COMPANY_JOBS',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    id: '3'
  },
  {
    data: {
      employeeSurvey: 'employeeSurvey2'
    },
    token: 'NICEFATHASH3',
    type: 'SHARE_COMPANY_JOBS',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    id: '4'
  }
])
data.employeeSurveys = data.employeeSurveys.concat([
  {
    id: 'employeeSurvey1',
    employee: 'employee1',
    survey: 'survey1'
  },
  {
    id: 'employeeSurvey2',
    employee: 'employee2',
    survey: 'survey1',
    typeformToken: '17df26f9c987c7eb3e50325caa60c913'
  }
])
data.hirers = data.hirers.concat([
  {
    id: '1',
    person: '21',
    company: '99'
  }
])
data.tasks = data.tasks.concat([
  {
    id: '1',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    hirer: '1',
    type: 'HIRER_SURVEY'
  },
  {
    id: '2',
    created: '2017-06-08T11:38:19.485+00:00',
    modified: '2017-06-08T11:38:19.485+00:00',
    company: '99',
    type: 'SHARE_JOBS'
  }
])

module.exports = data
