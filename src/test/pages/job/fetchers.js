/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const chaiAsPromised = require('chai-as-promised')
const proxyquire = require('proxyquire')
const nock = require('nock')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(dirtyChai)

const queries = require('../../../app/server/lib/queries-mutations')
const fetchers = proxyquire('../../../app/pages/job/fetchers', {
  '../../server/modules/template': { getRandom: () => 'randomTemplate' }
})

describe('Companies fetchers', () => {
  const api = nock('http://api:82')
  const params = {
    companySlugJobSlugReferralId: 'company-slug+job-slug+referralId'
  }
  const requestBody = {
    query: queries.GetReferralAndJobForPerson,
    variables: {
      companySlug: 'company-slug',
      jobSlug: 'job-slug',
      referralId: 'referralId',
      personId: 'personId',
      loggedIn: true
    }
  }

  beforeEach(() => {
    api
      .post('/', requestBody) // Verifies that this is the request and GraphQl query that we expect
      .reply(200, {
        data: {
          referral: 'referralId',
          company: {
            job: { templateTags: ['jobTemplateTag'] }
          }
        }
      })
  })
  afterEach(() => {
    nock.cleanAll()
  })

  describe('get', () => {
    it('should resolve with the page data', () => {
      return expect(fetchers.get({
        data: {
          person: { id: 'personId' }
        },
        params
      })).to.eventually.deep.equal({
        job: {
          templateTags: [ 'jobTemplateTag' ]
        },
        person: { id: 'personId' },
        referral: 'referralId',
        templates: 'randomTemplate'
      })
    })

    it('should append any passed data', () => {
      return expect(fetchers.get({
        data: {
          person: { id: 'personId' },
          passed: 'data'
        },
        params
      })).to.eventually.deep.equal({
        job: {
          templateTags: [ 'jobTemplateTag' ]
        },
        person: { id: 'personId' },
        passed: 'data',
        referral: 'referralId',
        templates: 'randomTemplate'
      })
    })

    it('should overwrite passed data with page data', () => {
      return expect(fetchers.get({
        data: {
          person: { id: 'personId' },
          referral: 'oldReferral'
        },
        params
      })).to.eventually.deep.equal({
        job: {
          templateTags: [ 'jobTemplateTag' ]
        },
        person: { id: 'personId' },
        referral: 'referralId',
        templates: 'randomTemplate'
      })
    })
  })
})
