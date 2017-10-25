/* global expect */
/* eslint-env mocha */
const proxyquire = require('proxyquire')
const nock = require('nock')
const sinon = require('sinon')
const errors = require('@nudj/framework/errors')

const queries = require('../../../app/server/lib/queries-mutations')

describe('Job fetchers', () => {
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
  const sandbox = sinon.createSandbox()
  let fetchers

  beforeEach(() => {
    fetchers = require('../../../app/pages/nudj/fetchers')
  })
  afterEach(() => {
    nock.cleanAll()
    sandbox.restore()
  })

  describe('post', () => {
    describe('on green path', () => {
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

      it('should resolve with the referral', () => {
        return expect(fetchers.post({
          data: {
            person: { id: 'personId' }
          },
          params
        })).to.eventually.have.property('referral', 'REFERRAL_DATA')
      })

      it('should append any passed data', () => {
        return expect(fetchers.post({
          data: {
            person: { id: 'personId' },
            passed: 'data'
          },
          params
        })).to.eventually.have.property('passed', 'data')
      })

      it('should overwrite passed data with page data', () => {
        return expect(fetchers.post({
          data: {
            person: { id: 'personId' },
            referral: 'oldReferral'
          },
          params
        })).to.eventually.have.property('referral', 'REFERRAL_DATA')
      })
    })

    describe('when already referred', () => {
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
              referral: null
            },
            errors: [
              {
                message: 'Already referred',
                locations: [
                  {
                    line: 6,
                    column: 3
                  }
                ],
                path: [
                  'referral'
                ]
              }
            ]
          })
      })

      it('should be rejected with a Redirect error', () => {
        return expect(fetchers.post({
          data: {
            person: { id: 'personId' }
          },
          params
        })).to.eventually.be.rejectedWith(errors.Redirect)
      })

      it('should be redirected back to job page and notified', () => {
        const errorsStub = sandbox.stub(errors)
        fetchers = proxyquire('../../../app/pages/nudj/fetchers', {
          '@nudj/framework/errors': errorsStub
        })
        return fetchers.post({
          data: {
            person: { id: 'personId' }
          },
          params
        })
        .catch(() => {
          expect(errorsStub.Redirect).to.have.been.calledWith({
            url: `/jobs/${params.companySlugJobSlugReferralId}`,
            notification: {
              type: 'error',
              message: 'You have already shared this job'
            }
          })
        })
      })
    })

    describe('when errors', () => {
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
          .reply(500)
      })

      it('should be rejected', () => {
        return expect(fetchers.post({
          data: {
            person: { id: 'personId' }
          },
          params
        })).to.eventually.be.rejected
      })

      it('should be rejected with regular error', () => {
        return fetchers.post({
          data: {
            person: { id: 'personId' }
          },
          params
        })
        .catch(error => {
          expect(error.message).to.equal('Request failed with status code 500')
        })
      })
    })
  })
})
