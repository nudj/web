const fragments = {
  Person: `
    fragment Person on Person {
      id
      email
      url
      firstName
      lastName
    }
  `,
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
      templateTags
      location
      application: applicationByFilters(filters: {
        person: $personId
      }) @include(if: $loggedIn) {
        id
      }
      referral: referralByFilters(filters: {
        person: $personId
      }) @include(if: $loggedIn) {
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
  `,
  Token: `
    fragment Token on Token {
      id
      token
      type
      data
    }
  `
}

module.exports = {
  GetPersonByEmail: `
    query GetPersonByEmail ($email: String) {
      person: personByFilters(filters: {
        email: $email
      }) {
        ...Person
      }
    }
    ${fragments.Person}
  `,
  CreatePerson: `
    mutation CreatePerson (
      $email: String!
      $firstName: String!
      $lastName: String!
      $url: String!
    ) {
      person: createPerson(input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        url: $url
      }) {
        ...Person
      }
    }
    ${fragments.Person}
  `,
  GetReferralAndJobForPerson: `
    query GetReferralAndJobForPerson ($refId: ID, $jobSlug: String!, $personId: ID, $loggedIn: Boolean!) {
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
  `,
  GetToken: `
    query GetToken (
      $token: String!
    ) {
      token:tokenByFilters(filters: {
        token: $token
      }
    ) {
        ...Token
      }
    }
    ${fragments.Token}
  `,
  CreateToken: `
    mutation CreateToken (
      $token: String!
      $type: TokenType!
      $data: Data
    ) {
      token: createToken(input: {
        token: $token
        type: $type
        data: $data
      }) {
        ...Token
      }
    }
    ${fragments.Token}
  `
}
