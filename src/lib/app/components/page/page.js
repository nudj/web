import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import get from 'lodash/get'

import HomePage from '../home-page'
import RequestPage from '../request-page'
import SignupPage from '../signup-page'
import HirerPage from '../hirer-page'
import JobPage from '../job-page'
import ApplyPage from '../apply-page'
import NudjPage from '../nudj-page'
import PageNotFound from '../404-page'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

const Component = (props) => {
  return get(props, 'error') ? (
    <Status code={get(props, 'error.code')}>
      <PageNotFound {...props} />
    </Status>
  ) : (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hiring' component={HirerPage} />
      <Route exact path='/request' component={RequestPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/jobs/:companySlugJobSlugId' component={JobPage} />
      <Route exact path='/jobs/:companySlugJobSlugId/apply' component={ApplyPage} />
      <Route exact path='/jobs/:companySlugJobSlugId/nudj' component={NudjPage} />
      <Route render={(props) => (
        <Status code={404}>
          <PageNotFound {...props} />
        </Status>
      )} />
    </Switch>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
