const hirer = require('../pages/hirer')
console.log(21)
const talent = require('../pages/home')
console.log(22)
const about = require('../pages/about')
console.log(23)
const request = require('../pages/request')
console.log(24)
const signup = require('../pages/signup')
console.log(25)
const job = require('../pages/job')
console.log(26)
const apply = require('../pages/apply')
console.log(27)
const applyComplete = require('../pages/apply-complete')
console.log(28)
const applySecret = require('../pages/apply')
console.log(29)
const nudj = require('../pages/nudj')
console.log(210)
const nudjSecret = require('../pages/nudj')
console.log(211)

module.exports = {
  '/': hirer,
  '/talent': talent,
  '/about': about,
  '/request': request,
  '/signup': signup,
  '/companies/:companySlug/jobs/:jobId': job,
  '/companies/:companySlug/jobs/:jobId/apply': apply,
  '/companies/:companySlug/jobs/:jobId/apply/complete': applyComplete,
  '/companies/:companySlug/jobs/:jobId/apply/:secret': applySecret,
  '/companies/:companySlug/jobs/:jobId/nudj': nudj,
  '/companies/:companySlug/jobs/:jobId/nudj/:secret': nudjSecret
}
