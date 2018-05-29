const { Redirect } = require('@nudj/library/errors')

const get = (props) => {
  const { referralIdentifier } = props.params

  let gql
  if (referralIdentifier.length === 10) {
    // referralIdentifier should be one of our new referral slugs
    gql = `
      query GetReferralDetail($referralIdentifier: String) {
        referral: referralBySlug(
          slug: $referralIdentifier
        ) {
          id
          slug
          job {
            slug
            company {
              slug
            }
          }
        }
      }
    `
  } else {
    // referralIdentifier should be one of our legacy ids
    gql = `
      query GetReferralDetail($referralIdentifier: ID) {
        referral: referralByLegacyId(
          id: $referralIdentifier
        ) {
          id
          slug
          job {
            slug
            company {
              slug
            }
          }
        }
      }
    `
  }

  const variables = {
    referralIdentifier
  }

  return {
    gql,
    variables,
    respond: data => {
      const companySlug = data.referral.job.company.slug
      const jobSlug = data.referral.job.slug
      const referralSlug = data.referral.slug

      throw new Redirect({
        url: `/companies/${companySlug}/jobs/${jobSlug}?referral=${referralSlug}`
      })
    }
  }
}

module.exports = {
  get
}
