import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import get from 'lodash/get'
import style from './message.css'
import NudjSuccess from '../nudj-success'

function messageAlreadyApplied (props) {
  // Say you've already applied if you've already applied
  const application = get(props, 'application')
  return application ? 'You\'ve already applied for this job' : ''
}

function messageNudjLink (props) {
  let message
  if (
    get(props, 'referrer.email') &&
    get(props, 'person.email') &&
    get(props, 'referrer.email') === get(props, 'person.email')
  ) {
    message = <NudjSuccess {...props} />
  }
  return message
}

function messageRequestPageAlreadyRequested (props) {
  // Someone's already requested access
  return ''
}

function messageSignupPageAlreadySignedup (props) {
  // Someone's already signed up
  return ''
}

function messageWrapper (props, message) {
  let outputMessage = message || props.message

  if (!outputMessage) {
    return (<div />)
  }

  const messageType = outputMessage && outputMessage.type ? outputMessage.type : 'primary'

  return (<div className={style.wrapper}>
    <div className={style[messageType]}>
      <div className={style.copy}>{outputMessage}</div>
    </div>
  </div>)
}

const Component = (props) => {
  return (
    <Switch>
      <Route exact path='/request' render={() => messageWrapper(props, messageRequestPageAlreadyRequested(props))} />
      <Route exact path='/signup' render={() => messageWrapper(props, messageSignupPageAlreadySignedup(props))} />
      <Route exact path='/:companySlug/:jobSlugId' render={() => messageWrapper(props, messageAlreadyApplied(props))} />
      <Route exact path='/:companySlug/:jobSlugId/nudj' render={() => messageWrapper(props, messageNudjLink(props))} />
      <Route render={() => messageWrapper(props)} />
    </Switch>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
