module.exports = {
  '/': require('../pages/home'),
  '/hiring': require('../pages/hirer'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/jobs/:companySlugJobSlugRefId': require('../pages/job'),
  '/jobs/:companySlugJobSlugRefId/apply': require('../pages/apply'),
  '/jobs/:companySlugJobSlugRefId/nudj': require('../pages/nudj'),
  '/jobs/:companySlugJobSlugRefId/nudj/:secret': require('../pages/nudj'),
  '/token/:token': require('../pages/token')
}
