import { StyleSheet, css } from 'aphrodite/no-important'

import { default as merge } from 'lodash/merge'

export { merge }

import * as variables from './css/variables'
import * as mixins from './css/mixins'

export default (stylesheet) => {
  const styles = StyleSheet.create(stylesheet)
  const cssStyles = Object.keys(stylesheet).reduce((classList, className) => {
    classList[className] = css(styles[className])
    return classList
  }, {})
  return cssStyles
}

export { mixins, variables }

// const dimHover = {
//   backfaceVisibility: 'hidden',
//   opacity: '.5',
//   transition: 'opacity .15s ease-in'
// }
// export const dim = {
//   opacity: 1,
//   transition: 'opacity .15s ease-in',
//   ':hover': dimHover,
//   ':focus': dimHover,
//   ':active': {
//     backfaceVisibility: 'hidden',
//     opacity: '.8',
//     transition: 'opacity .15s ease-out'
//   }
// }
//
// const visited = {
//   transition: 'color .15s ease-in'
// }
// export const link = {
//   textDecoration: 'none',
//   transition: 'color .15s ease-in',
//   ':link': visited,
//   ':visited': visited,
//   ':hover': {
//     transition: 'color .15s ease-in'
//   },
//   ':focus': {
//     transition: 'color .15s ease-in',
//     outline: '1px dotted currentColor'
//   }
// }
//
// const growHover = {
//   transform: 'scale( 1.05 )'
// }
// export const grow = {
//   backfaceVisibility: 'hidden',
//   transform: 'translateZ( 0 )',
//   transition: 'transform .25s ease-out',
//   ':hover': growHover,
//   ':focus': growHover,
//   ':active': {
//     transform: 'transform: scale( .90 )'
//   }
// }
