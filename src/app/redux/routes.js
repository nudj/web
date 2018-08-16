module.exports = {
  '/': require('../pages/hirer'),
  '/talent': require('../pages/home'),
  '/about': require('../pages/about'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/companies/:companySlug/jobs/:jobSlug': require('../pages/job'),
  '/companies/:companySlug/jobs/:jobSlug/apply': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobSlug/apply/complete': require('../pages/apply-complete'),
  '/companies/:companySlug/jobs/:jobSlug/apply/:secret': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobSlug/nudj': require('../pages/nudj'),
  '/companies/:companySlug/jobs/:jobSlug/nudj/:secret': require('../pages/nudj')
}
