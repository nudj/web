module.exports = {
  GetJobForPerson: `
    query GetCompanyAndJob ($jobSlug: String!, $personId: ID) {
      job: jobByFilters(filters: {
        slug: $jobSlug
      }) {
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
    }
  `,
  GetCompanyAndJob: `
    query GetCompanyAndJob ($companySlug: String!, $jobSlug: String!) {
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
    }
  `,
  GetCompanyJobAndReferral: `
    query GetCompanyJobAndReferral ($companySlug: String!, $jobSlug: String!, $refId: ID!) {
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
  `
}
