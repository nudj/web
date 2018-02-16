module.exports = {
  '/': require('../pages/home'),
  '/hiring': require('../pages/hirer'),
  '/request': require('../pages/request'),
  '/signup': require('../pages/signup'),
  '/companies/:companySlug': require('../pages/companies'),
  '/companies/:companySlug/jobs/:jobId': require('../pages/job'),
  '/jobs/:companySlugJobSlugReferralId': require('../pages/job'),
  '/jobs/:companySlugJobSlugReferralId/apply': require('../pages/apply'),
  '/jobs/:companySlugJobSlugReferralId/apply/:secret': require('../pages/apply'),
  '/jobs/:companySlugJobSlugReferralId/nudj': require('../pages/nudj'),
  '/jobs/:companySlugJobSlugReferralId/nudj/:secret': require('../pages/nudj')
}
