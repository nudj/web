const React = require('react')
const get = require('lodash/get')

const { getStyle, setStyles } = require('./message.css')

const Message = (props) => {
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

module.exports = Message
