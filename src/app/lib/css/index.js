const { StyleSheet } = require('aphrodite/no-important')

const variables = require('./variables')
const mixins = require('./mixins')

const extensions = require('./extensions')

const Extended = StyleSheet.extend(extensions)

const css = (stylesheet) => {
  return () => {
    const styles = Extended.StyleSheet.create(stylesheet)
    const cssStyles = Object.keys(stylesheet).reduce((classList, className) => {
      classList[className] = Extended.css(styles[className])
      return classList
    }, {})
    return cssStyles
  }
}

module.exports = {
  css,
  mixins,
  variables
}
