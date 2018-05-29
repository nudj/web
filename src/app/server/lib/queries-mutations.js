const fragments = {
  Person: `
    fragment Person on Person {
      id
      email
      url
      firstName
      lastName
      signedUp
    }
  `,
  Company: `
    fragment Company on Company {
      id
      name
      logo
      slug
      url
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
      roleDescription
      candidateDescription
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
        industry
        mission
        slug
        description
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
  `,
  Employee: `
    fragment Employee on Employee {
      id
      company {
        id
        name
        slug
      }
      person {
        id
        email
        url
        firstName
        lastName
      }
    }
  `,
  Survey: `
    fragment Survey on Survey {
      id
      company {
        id
        name
        slug
      }
      link
      uuid
      type
    }
  `,
  EmployeeSurvey: `
    fragment EmployeeSurvey on EmployeeSurvey {
      id
      employee {
        ...Employee
      }
      survey {
        ...Survey
      }
      typeformToken
    }
  `,
  Message: `
    fragment Message on Message {
      id
      pixelToken
      readCount
    }
  `,
  Hirer: `
    fragment Hirer on Hirer {
      id
      company {
        ...Company
      }
      person {
        ...Person
      }
    }
  `,
  Task: `
    fragment Task on Task {
      id
      company {
        ...Company
      }
      hirer {
        ...Hirer
      }
      type
      completed {
        ...Hirer
      }
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
      $url: String
      $signedUp: Boolean
    ) {
      person: createPerson(input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        url: $url
        signedUp: $signedUp
      }) {
        ...Person
      }
    }
    ${fragments.Person}
  `,
  UpdatePerson: `
    mutation UpdatePerson (
      $id: ID!
      $data: PersonUpdateInput!
    ) {
      person: updatePerson(
        id: $id,
        data: $data
      ) {
        ...Person
      }
    }
    ${fragments.Person}
  `,
  GetReferralAndJobForPerson: `
    query GetReferralAndJobForPerson (
      $companySlug: String!,
      $jobSlug: String!,
      $referralId: ID,
      $personId: ID,
      $loggedIn: Boolean!
    ) {
      referral(id: $referralId) {
        ...Referral
      }
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        slug
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          ...Job
        }
      }
    }
    ${fragments.Referral}
    ${fragments.Job}
  `,
  getJobInCompany: `
    query getJobInCompany (
      $companySlug: String!,
      $jobSlug: String!
    ) {
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        id
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          id
        }
      }
    }
  `,
  getReferralBySlugForJobInCompany: `
    query getReferralBySlugForJobInCompany (
      $companySlug: String!,
      $jobSlug: String!,
      $referralSlug: String
    ) {
      referral: referralBySlug( slug: $referralSlug ) {
        id
        job {
          id
        }
      }
      company: companyByFilters(filters: {
        slug: $companySlug
      }) {
        id
        job: jobByFilters(filters: {
          slug: $jobSlug
        }) {
          id
        }
      }
    }
  `,
  getReferralByLegacyId: `
    query getReferralByLegacyId (
      $referralLegacyId: ID
    ) {
      referral: referralByLegacyId( id: $referralLegacyId ) {
        id
        slug
      }
    }
  `,
  GetReferral: `
    query GetReferral (
      $job: ID!
      $person: ID!
    ) {
      referral: referralByFilters(
        filters: {
          job: $job
          person: $person
        }
      ) {
        ...Referral
      }
    }
    ${fragments.Referral}
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
  `,
  GetEmployee: `
    query GetEmployee (
      $id: ID!
    ) {
      employee(id: $id) {
        ...Employee
      }
    }
    ${fragments.Employee}
  `,
  GetSurvey: `
    query GetSurvey (
      $id: ID!
    ) {
      survey(id: $id) {
        ...Survey
      }
    }
    ${fragments.Survey}
  `,
  GetMessageByPixelToken: `
    query GetMessageByPixelToken (
      $pixelToken: String
    ) {
      message: messageByFilters(filters: {
        pixelToken: $pixelToken
      }) {
        ...Message
      }
    }
    ${fragments.Message}
  `,
  UpdateMessageReadCount: `
    mutation UpdateMessage (
      $id: ID!
      $input: MessageUpdateInput!
    ) {
        message: updateMessage(id: $id, input: $input) {
          ...Message
        }
    }
    ${fragments.Message}
  `,
  GetJobsForCompany: `
    query GetJobsForCompany (
      $company: ID!
    ) {
      jobs:jobs(filters: { company: $company })
      {
        id
        slug
        title
      }
    }
  `,
  GetReferralByJobAndPerson: `
    query GetReferralByJobAndPerson (
      $job: ID!
      $person: ID!
    ) {
      referral:referralByFilters(filters: {
        job: $job
        person: $person
      }) {
        ...Referral
      }
    }
    ${fragments.Referral}
  `,
  GetEmployeeSurvey: `
    query GetEmployeeSurvey (
      $id: ID!
    ) {
      employeeSurvey(id: $id) {
        ...EmployeeSurvey
      }
    }
    ${fragments.EmployeeSurvey}
    ${fragments.Employee}
    ${fragments.Survey}
  `,
  CreateEmployeeSurvey: `
    mutation CreateEmployeeSurvey (
      $employee: ID!
      $survey: ID!
      $typeformToken: String!
    ) {
      employeeSurvey: createEmployeeSurvey(input: {
        employee: $employee
        survey: $survey
        typeformToken: $typeformToken
      }) {
        ...EmployeeSurvey
      }
    }
    ${fragments.EmployeeSurvey}
    ${fragments.Employee}
    ${fragments.Survey}
  `,
  UpdateEmployeeSurvey: `
    mutation UpdateEmployeeSurvey (
      $id: ID!
      $input: EmployeeSurveyUpdateInput!
    ) {
      employeeSurvey: updateEmployeeSurvey(
        id: $id,
        input: $input
      ) {
        ...EmployeeSurvey
      }
    }
    ${fragments.EmployeeSurvey}
    ${fragments.Employee}
    ${fragments.Survey}
  `,
  GetIncompleteTasks: `
    query GetIncompleteTasks (
      $company: ID,
      $hirer: ID,
      $type: TaskType!
    ) {
      tasks:tasks(filters: {
        company: $company,
        hirer: $hirer,
        type: $type
        completed: null
      })
      {
        ...Task
      }
    }
    ${fragments.Task}
    ${fragments.Company}
    ${fragments.Hirer}
    ${fragments.Person}
  `,
  UpdateTask: `
    mutation UpdateTask (
      $id: ID!
      $input: TaskUpdateInput!
    ) {
      task: updateTask(
        id: $id,
        input: $input
      ) {
        ...Task
      }
    }
    ${fragments.Task}
    ${fragments.Company}
    ${fragments.Hirer}
    ${fragments.Person}
  `,
  GetHirer: `
    query GetHirer (
      $id: ID!
    ) {
      hirer(id: $id) {
        ...Hirer
      }
    }
    ${fragments.Hirer}
    ${fragments.Person}
    ${fragments.Company}
  `,
  GetHirerFromPerson: `
    query GetHirerFromPerson ($person: ID!) {
      person(id: $person) {
        firstName
        lastName
        email
        hirer {
          ...Hirer
        }
      }
    }
    ${fragments.Hirer}
    ${fragments.Person}
    ${fragments.Company}
  `
}
