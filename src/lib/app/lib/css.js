import { StyleSheet, css } from 'aphrodite/no-important'

import { default as merge } from 'lodash/merge'

export { merge }

import * as variables from './css/variables'
import * as mixins from './css/mixins'

export default (stylesheet) => {
  return () => {
    const styles = StyleSheet.create(stylesheet)
    const cssStyles = Object.keys(stylesheet).reduce((classList, className) => {
      classList[className] = css(styles[className])
      return classList
    }, {})
    return cssStyles
  }
}

export { mixins, variables }
