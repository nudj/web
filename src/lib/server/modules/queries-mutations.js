const fragments = {
  Job: `
    fragment Job on Job {
      id
      created
      modified
      title
      slug
      url
      status
      bonus
      description
      type
      remuneration
      tags
      location
      application: applicationByFilters(filters: {
        person: $personId
      }) {
        id
      }
      referral: referralByFilters(filters: {
        person: $personId
      }) {
        id
        job {
          slug
          company {
            slug
          }
        }
      }
      company {
        id
        name
        logo
        slug
        url
      }
      relatedJobs {
        id
        title
        slug
        company {
          name
          slug
        }
      }
    }
  `,
  Referral: `
    fragment Referral on Referral {
      id
      job {
        slug
        company {
          slug
        }
      }
    }
  `,
  Application: `
    fragment Application on Application {
      id
    }
  `
}

module.exports = {
  GetReferralAndJobForPerson: `
    query GetReferralAndJobForPerson ($refId: ID, $jobSlug: String!, $personId: ID) {
      referral(id: $refId) {
        ...Referral
      }
      job: jobByFilters(filters: {
        slug: $jobSlug
      }) {
        ...Job
      }
    }
    ${fragments.Referral}
    ${fragments.Job}
  `,
  GetCompanyJobAndReferral: `
    query GetCompanyJobAndReferral ($companySlug: String!, $jobSlug: String!, $refId: ID) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        id
      }
      job: jobByFilters(filters: {
        slug: $jobSlug
      }) {
        id
        company {
          id
        }
      }
      referral(id: $refId) {
        id
        job {
          id
        }
      }
    }
  `,
  CreateReferralForPerson: `
    mutation CreateReferralForPerson (
      $parent: ID = null
      $job: ID!
      $person: ID!
    ) {
      referral: createReferral(input: {
        parent: $parent
        job: $job
        person: $person
      }) {
        ...Referral
      }
    }
    ${fragments.Referral}
  `,
  CreateApplicationForPerson: `
    mutation CreateApplicationForPerson (
      $referral: ID = null
      $job: ID!
      $person: ID!
    ) {
      application: createApplication(input: {
        referral: $referral
        job: $job
        person: $person
      }) {
        ...Application
      }
    }
    ${fragments.Application}
  `
}
