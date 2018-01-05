const { Redirect } = require('@nudj/framework/errors')
const { merge } = require('@nudj/library')

const job = require('../../server/modules/job')
const queries = require('../../server/lib/queries-mutations')

const post = (props) => {
  const { params, session, body } = props
  const { jobId } = body
  const { data } = session 

  const [
    companySlug,
    jobSlug,
    referralId
  ] = params.companySlugJobSlugReferralId.split('+')

  const gql = queries.CreateReferralForPerson
  const variables = { job: jobId, referral: referralId, person: data.person.id }

  return { gql, variables }
}

module.exports = {
  post
}
