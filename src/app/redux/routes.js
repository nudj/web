module.exports = {
  '/': require('../pages/home'),
  '/hiring': require('../pages/hirer'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/jobs/:companySlugJobSlugReferralId': require('../pages/job'),
  '/jobs/:companySlugJobSlugReferralId/apply': require('../pages/apply'),
  '/jobs/:companySlugJobSlugReferralId/apply/:secret': require('../pages/apply'),
  '/jobs/:companySlugJobSlugReferralId/nudj': require('../pages/nudj'),
  '/jobs/:companySlugJobSlugReferralId/nudj/:secret': require('../pages/nudj'),
  '/token/:token': require('../pages/token')
}
