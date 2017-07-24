import { StyleSheet } from 'aphrodite/no-important'

import { default as merge } from 'lodash/merge'

export { merge }

import * as variables from './css/variables'
import * as mixins from './css/mixins'

import extensions from './extensions'

const Extended = StyleSheet.extend(extensions)

export default (stylesheet) => {
  return () => {
    const styles = Extended.StyleSheet.create(stylesheet)
    const cssStyles = Object.keys(stylesheet).reduce((classList, className) => {
      classList[className] = Extended.css(styles[className])
      return classList
    }, {})
    return cssStyles
  }
}

export { mixins, variables }
