const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const alert = {
  backgroundColor: variables.colors.navy,
  color: variables.colors.white
}

const styles = {
  wrapper: {
    width: '100%' // ?
  },
  default: alert,
  primary: alert,
  info: alert,
  warning: alert,
  error: alert,
  success: alert,
  content: merge(mixins.basicContainer({
    color: variables.colors.white,
    padding: variables.padding.e,
    textAlign: 'center',
    [mixins.breakpoints.ns]: {
      padding: `${variables.padding.e} 0`
    }
  }), mixins.headings.p),
  successContent: {
    color: variables.colors.white,
    textAlign: 'center',
    width: '100%' // ?
  }
}

let colouredStyles = {}

const setStyles = (backgroundColour, textColour, textHighlightColour, buttonTextColour) => {
  if (backgroundColour === 'undefined') {
    backgroundColour = undefined
  }

  if (textColour === 'undefined') {
    textColour = undefined
  }

  if (textHighlightColour === 'undefined') {
    textHighlightColour = undefined
  }

  if (buttonTextColour === 'undefined') {
    buttonTextColour = undefined
  }

  const colouredAlert = {
    backgroundColor: variables.colors[backgroundColour] || alert.backgroundColor,
    color: variables.colors[textColour] || alert.color
  }

  colouredStyles = {
    default: colouredAlert,
    primary: colouredAlert,
    info: colouredAlert,
    warning: colouredAlert,
    error: colouredAlert,
    success: colouredAlert,
    content: {
      color: variables.colors[textColour] || styles.content.color
    },
    successContent: {
      color: variables.colors[textColour] || styles.successContent.color
    }
  }
}

const getStyle = () => {
  const compiledStyles = merge({}, styles, colouredStyles)
  return css(compiledStyles)()
}

module.exports = getStyle
module.exports.getStyle = getStyle
module.exports.setStyles = setStyles
