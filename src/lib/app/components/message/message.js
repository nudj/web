import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import { getStyle, setStyles } from './message.css'

const Component = (props) => {
  const backgroundColour = get(props, 'backgroundColour')
  const textColour = get(props, 'textColour')
  const textHighlightColour = get(props, 'textHighlightColour')
  const buttonTextColour = get(props, 'buttonTextColour')

  setStyles(backgroundColour, textColour, textHighlightColour, buttonTextColour)
  const style = getStyle()

  const messageType = get(props, 'messageType')
  const message = get(props, 'message')

  if (!message) {
    return (<div />)
  }

  const messageClass = style[messageType] ? style[messageType] : style.default

  const outputMessage = message && message.message ? message.message : message

  return (<div className={style.wrapper}>
    <div className={messageClass}>
      <div className={style.content}>{outputMessage}</div>
    </div>
  </div>)
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
