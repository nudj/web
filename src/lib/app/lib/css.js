import { StyleSheet, css } from 'aphrodite/no-important'

import { default as merge } from 'lodash/merge'

import * as variables from './css/variables'
import * as mixins from './css/mixins'

export default (stylesheet) => {
  const styles = StyleSheet.create(stylesheet)

  return Object.keys(stylesheet).reduce((classList, className) => {
    classList[className] = css(styles[className])
    return classList
  }, {})
}

export { mixins, variables }

export { merge }

export const breakpoints = {
  ns: `@media screen and (min-width: ${variables.breakpoints.medium})`,
  m: `@media screen and (min-width: ${variables.breakpoints.medium}) and (max-width: ${variables.breakpoints.large})`,
  l: `@media screen and (min-width: ${variables.breakpoints.large})`
}

const fonts = {
  jan: mixins.createFont('jan', variables.fonts.jan)
}

export const headings = {
  h1: merge({
    fontSize: variables.fontSizes.f2,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f1
    }
  }, fonts.jan.bold),
  h2: merge({
    fontSize: variables.fontSizes.f3,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f2
    }
  }, fonts.jan.bold),
  h3: merge({
    fontSize: variables.fontSizes.f4,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f3
    }
  }, fonts.jan.bold),
  h4: merge({
    fontSize: variables.fontSizes.f5,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  }, fonts.jan.bold),
  h4Light: merge({
    fontSize: variables.fontSizes.f5,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  }, fonts.jan.regular),
  h5: merge({
    fontSize: variables.fontSizes.f6,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f5
    }
  }, fonts.jan.bold),
  p: merge({
    fontSize: variables.fontSizes.f5,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  }, fonts.jan.regular)
}

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
