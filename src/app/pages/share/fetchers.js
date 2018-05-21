const { Redirect } = require('@nudj/library/errors')

const get = (props) => {
  const { referralId } = props.params

  const gql = `
    query GetReferralDetail($referralId: ID!) {
      referral: referral(
        id: $referralId
      ) {
        id
        job {
          slug
          company {
            slug
          }
        }
      }
    }
  `

  const variables = {
    referralId
  }

  return {
    gql,
    variables,
    respond: data => {
      const companySlug = data.referral.job.company.slug
      const jobSlug = data.referral.job.slug

      throw new Redirect({
        url: `/companies/${companySlug}/jobs/${jobSlug}?referralId=${referralId}`
      })
    }
  }
}

module.exports = {
  get
}
