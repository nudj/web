module.exports = {
  '/': require('../pages/hirer'),
  '/talent': require('../pages/home'),
  '/about': require('../pages/about'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/companies/:companySlug/jobs/:jobId': require('../pages/job'),
  '/companies/:companySlug/jobs/:jobId/apply': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobId/apply/complete': require('../pages/apply-complete'),
  '/companies/:companySlug/jobs/:jobId/apply/:secret': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobId/nudj': require('../pages/nudj'),
  '/companies/:companySlug/jobs/:jobId/nudj/:secret': require('../pages/nudj')
}
