module.exports = {
  '/': require('../pages/home'),
  '/talent': require('../pages/talent'),
  '/about': require('../pages/about'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/companies/:companySlug/jobs/:jobSlug': require('../pages/job'),
  '/companies/:companySlug/jobs/:jobSlug/apply': require('../pages/apply'),
  '/companies/:companySlug/jobs/:jobSlug/nudj': require('../pages/nudj'),
  '/companies/:companySlug/jobs/:jobSlug/nudj/:secret': require('../pages/nudj')
}
