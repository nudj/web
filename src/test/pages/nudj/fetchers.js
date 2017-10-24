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
const fetchers = require('../../../app/pages/nudj/fetchers')

describe.only('Job fetchers', () => {
  const api = nock('http://api:82')
  const params = {
    companySlugJobSlugReferralId: 'company-slug+job-slug+referralId'
  }
  const jobRequestBody = {
    query: queries.getJobInCompany,
    variables: {
      companySlug: 'company-slug',
      jobSlug: 'job-slug'
    }
  }
  const nudjRequestBody = {
    query: queries.CreateReferralForPerson,
    variables: {
      parent: 'referralId',
      job: '102',
      person: 'personId'
    }
  }

  beforeEach(() => {
    api
      .post('/', jobRequestBody)
      .reply(200, {
        data: {
          company: {
            id: '101',
            job: {
              id: '102'
            }
          }
        }
      })
      .post('/', nudjRequestBody)
      .reply(200, {
        data: {
          referral: 'REFERRAL_DATA'
        }
      })
  })
  afterEach(() => {
    nock.cleanAll()
  })

  describe('post', () => {
    it('should resolve with the referral', () => {
      // return expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo")
      return expect(fetchers.post({
        data: {
          person: { id: 'personId' }
        },
        params
      // // })).to.eventually.be.an('object')
      // // })).to.eventually.have.property('referral')
      })).to.eventually.deep.equal({
        person: { id: 'personId' },
        referral: 'REFERRAL_DATA'
      })
    })

    xit('should append any passed data', () => {
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

    xit('should overwrite passed data with page data', () => {
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
