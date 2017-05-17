import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import get from 'lodash/get'
import getStyle from './message.css'
import NudjSuccess from '../nudj-success'

let style

function messageAlreadyApplied (props) {
  // Say you've already applied if you've already applied
  const application = get(props, 'application')
  return application ? 'You\'ve already applied for this job' : ''
}

function messageNudjLink (props) {
  let message

  const isReferrerByProps = get(props, 'referrer.email') && get(props, 'person.email') && get(props, 'referrer.email') === get(props, 'person.email')
  const isReferrerByMessage = props.message && props.message.type === 'error' && props.message.code === 403 && props.message.message === 'Already referred'

  if (isReferrerByProps || isReferrerByMessage) {
    message = (<div className={style.successContent}>
      <p>You've already nudj'd this job. Below is your unique link.</p>
      <NudjSuccess {...props} />
    </div>)
  }
  return message
}

function messageJobPage (props) {
  const alreadyApplied = messageAlreadyApplied(props)
  const alreadyReferred = messageNudjLink(props)

  if (alreadyReferred) {
    return alreadyReferred
  } else if (alreadyApplied) {
    return alreadyApplied
  } else {
    return null
  }
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

  // Fill this in later, there's an issue that when you return a react component
  // it has a type property which is not what we're after here
  // const messageType = outputMessage && outputMessage.type ? outputMessage.type : 'primary'
  const messageType = 'primary'

  if (outputMessage.message) {
    outputMessage = outputMessage.message
  }

  return (<div className={style.wrapper}>
    <div className={style[messageType]}>
      <div className={style.content}>{outputMessage}</div>
    </div>
  </div>)
}

const Component = (props) => {
  style = getStyle()
  return (
    <Switch>
      <Route exact path='/request' render={() => messageWrapper(props, messageRequestPageAlreadyRequested(props))} />
      <Route exact path='/signup' render={() => messageWrapper(props, messageSignupPageAlreadySignedup(props))} />
      <Route exact path='/jobs/:companySlugJobSlugRefId' render={() => messageWrapper(props, messageJobPage(props))} />
      <Route exact path='/jobs/:companySlugJobSlugRefId/nudj' render={() => messageWrapper(props, messageNudjLink(props))} />
      <Route render={() => messageWrapper(props)} />
    </Switch>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
