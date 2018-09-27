const postApplication = ({ params, body, analytics, req }) => {
  const { referralId, ...person } = body

  const gql = `
    mutation CreatePersonAndApplication(
      $companySlug: String!,
      $jobSlug: String!,
      $person: PersonCreateInput!,
      $referralId: ID
    ) {
      company: companyByFilters(filters: {slug: $companySlug}) {
        name
        job: jobByFilters(filters: {slug: $jobSlug}) {
          title
          application: getOrCreatePersonAndApplication(person: $person, referral: $referralId) {
            id
            person {
              id
            }
          }
        }
      }
    }
  `

  const variables = {
    person,
    referralId,
    companySlug: params.companySlug,
    jobSlug: params.jobSlug
  }

  const transformData = async data => {
    const personId = data.company.job.application.person.id
    const { email, firstName, lastName } = person

    await analytics.identify({ id: personId }, {
      email,
      name: firstName && lastName && `${firstName} ${lastName}`
    }, { preserveTraits: true })
    analytics.track({
      object: analytics.objects.applicant,
      action: analytics.actions.applicant.created,
      properties: {
        job: data.company.job.title,
        company: data.company.name,
        referralId
      }
    })

    return data
  }

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = {
  postApplication
}
