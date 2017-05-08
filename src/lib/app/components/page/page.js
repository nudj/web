import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import get from 'lodash/get'

import HomePage from '../home-page'

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
    <Status code={get(props, 'error.code')} />
  ) : (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hiring' component={HirerPage} />
      <Route exact path='/request' component={RequestPage} />
      <Route exact path='/signup' component={SignupPage} />
      <Route exact path='/jobs/:companySlugJobSlugRefId' component={JobPage} />
      <Route exact path='/jobs/:companySlugJobSlugRefId/apply' component={ApplyPage} />
      <Route exact path='/jobs/:companySlugJobSlugRefId/nudj' component={NudjPage} />
      <Route render={(props) => (
        <Status code={404} />
      )} />
    </Switch>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
