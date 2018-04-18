module.exports = {
  '/': require('../pages/home'),
  '/hiring': require('../pages/hirer'),
  '/about': require('../pages/about'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/jobs': require('../pages/all-jobs'),
  '/companies/:companySlug': require('../pages/companies'),
  '/companies/:companySlug/jobs/:jobId': require('../pages/job'),
  '/companies/:companySlug/jobs/:jobId/apply': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobId/apply/complete': require('../pages/apply-complete'),
  '/companies/:companySlug/jobs/:jobId/apply/:secret': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobId/nudj': require('../pages/nudj'),
  '/companies/:companySlug/jobs/:jobId/nudj/:secret': require('../pages/nudj')
}
