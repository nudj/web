import { default as merge } from 'lodash/merge'

import * as variables from './variables'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// Breakpoints
export const breakpoints = {
  // Using max-width is counter to the progressive-enhancement ideals, please use sparingly
  s: `@media screen and (max-width: ${variables.breakpoints.medium})`,
  ns: `@media screen and (min-width: ${variables.breakpoints.medium})`,
  l: `@media screen and (min-width: ${variables.breakpoints.large})`,
  xl: `@media screen and (min-width: ${variables.breakpoints.xl})`
}

export const cardStyle = {
  background: variables.colours.white,
  borderRadius: variables.sizes.formsInputBorderRadius,
  boxShadow: `${variables.sizes.genericBoxShadow} ${variables.colours.charcoal}`,
  padding: variables.padding.d
}

// Fonts
function createFontFamily (name, properties) {
  const fontFamily = name
  const src = `url('${variables.assets.fonts}${properties.files.eot}?#iefix') format('embedded-opentype'),
    url('${variables.assets.fonts}${properties.files.woff}') format('woff'),
    url('${variables.assets.fonts}${properties.files.woff2}') format('woff2'),
    url('${variables.assets.fonts}${properties.files.ttf}') format('truetype')`
  const fontStyle = `${properties.style}`
  const fontWeight = `${properties.weight}`

  return {fontFamily, fontStyle, fontWeight, src}
}

function createFont (name, font) {
  const fontFamilies = {}
  for (let variation in font) {
    const newName = `${name}-${variation}`
    fontFamilies[variation] = createFontFamily(newName, font[variation])
  }
  return fontFamilies
}

const fonts = {
  jan: createFont('jan', variables.fonts.jan)
}

const headings = {
  h1: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f2,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f1
    }
  },
  h2: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f3,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f2
    }
  },
  h3: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f4,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f3
    }
  },
  h4: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f5,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  },
  h4Light: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f5,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  },
  h5: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f6,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f5
    }
  },
  h6: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f7,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f6
    }
  },
  p: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f6,
    fontWeight: 'normal',
    lineHeight: variables.sizes.copyLineHeight,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f7
    }
  },
  p2: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f7,
    fontWeight: 'normal',
    lineHeight: variables.sizes.copyLineHeight,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f8
    }
  },
  small: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f9,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f9
    }
  }
}

headings.pBold = merge({}, headings.p, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

headings.p2Bold = merge({}, headings.p2, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

export { headings }

// Layout
export function basicContainer (properties) {
  const basicContainerBasic = {
    padding: `0 ${variables.padding.d}`,
    position: 'relative',
    [breakpoints.ns]: {
      margin: '0 auto',
      maxWidth: variables.sizes.contentMaxWidth
    }
  }
  return merge({}, basicContainerBasic, properties || {})
}

export function basicContainerMedium (properties) {
  return merge({}, basicContainer(properties), {
    [breakpoints.ns]: {
      margin: '0 auto',
      maxWidth: variables.sizes.contentMediumMaxWidth
    }
  })
}

export function basicContainerSmaller (properties) {
  return merge({}, basicContainer(properties), {
    [breakpoints.ns]: {
      margin: '0 auto',
      maxWidth: variables.sizes.formsMaxWidth
    }
  })
}

export function flexColumn (properties) {
  const flexColumnBasic = {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto', // flex-auto // ????
    flexDirection: 'column',
    justifyContent: 'center'
  }
  return merge({}, flexColumnBasic, properties || {})
}

// Buttons
export function button (properties) {
  const buttonBasic = {
    borderColor: 'transparent',
    borderRadius: variables.sizes.magicBorderRadius,
    borderStyle: 'solid',
    borderWidth: variables.sizes.buttonBorderWidth,
    cursor: 'pointer',
    display: 'inline-block',
    minWidth: `calc(${variables.padding.d} * 10)`,
    outline: 'none',
    padding: `calc((${variables.padding.e} * 1.5) - ${variables.sizes.buttonBorderWidth}) calc(${variables.padding.c} - ${variables.sizes.buttonBorderWidth})`,
    textAlign: 'center'
  }
  return merge({}, deLink(), buttonBasic, headings.h6, properties || {})
}

function buttonPrimaryHover () {
  const index = getRandomInt(1, variables.buttonHoverOptionSVGs.length)
  const base = variables.buttonHoverOptionSVGs[index - 1]
  const left = linkImage(`${base}-left.svg`)
  const right = linkImage(`${base}-right.svg`)

  const xOffset = variables.padding.c

  const baseStyles = {
    backgroundRepeat: 'no-repeat',
    height: `calc(100% + ${xOffset})`,
    pointerEvents: 'none',
    position: 'absolute',
    top: `calc(${xOffset} * -0.5)`,
    width: `calc(${xOffset} * 2)`
  }

  const invisible = {
    opacity: '0',
    transform: 'scale3d(0.5, 0.5, 1)'
  }

  const visible = {
    opacity: '1',
    transform: 'scale3d(1.05, 1.05, 1)'
  }

  const transition = {
    details: variables.transitions.bouncy,
    properties: ['all']
  }

  const before = makePsuedoElement(merge({}, baseStyles, makeTransition(transition, invisible), {
    backgroundImage: left,
    backgroundPosition: 'left center',
    left: `calc(${xOffset} * -0.5)`,
    transformOrigin: 'center right'
  }))

  const after = makePsuedoElement(merge({}, baseStyles, makeTransition(transition, invisible), {
    backgroundImage: right,
    backgroundPosition: 'right center',
    right: `calc(${xOffset} * -0.5)`,
    transformOrigin: 'center left'
  }))

  return merge({
    [breakpoints.l]: {
      '::after': after,
      '::before': before,
      ':hover': {
        '::after': visible,
        '::before': visible
      },
      ':disabled:hover': {
        '::after': {
          display: 'none'
        },
        '::before': {
          display: 'none'
        }
      }
    }
  }, buttonHoverPop())
}

function buttonHoverPop () {
  const base = {
    [breakpoints.l]: {
      transform: 'scale3d(1, 1, 1)',
      ':hover': {
        transform: 'scale3d(1.05, 1.05, 1)'
      },
      ':disabled:hover': {
        transform: 'scale3d(1, 1, 1)'
      }
    }
  }

  const transition = {
    details: variables.transitions.bouncy,
    properties: ['all']
  }

  return makeTransition(transition, base)
}

export function buttonPrimary (properties) {
  const buttonPrimary = {
    backgroundColor: variables.colours.royalBlue,
    borderColor: variables.colours.royalBlue,
    color: variables.colours.white,
    position: 'relative'
  }

  return merge({}, button(buttonPrimary), buttonPrimaryHover(), properties || {})
}

export function disabled (properties = {}) {
  const disabled = {
    cursor: 'default',
    opacity: '0.5'
  }
  return merge(disabled, properties)
}

export function buttonPrimaryDisabled (properties = {}) {
  const button = buttonPrimary(disabled())
  return merge(button, properties)
}

export function buttonSecondary (properties) {
  const buttonSecondary = {
    backgroundColor: variables.colours.white,
    borderColor: variables.colours.royalBlue,
    color: variables.colours.royalBlue
  }
  return merge({}, button(buttonSecondary), buttonHoverPop(), properties || {})
}

export function buttonSecondaryBorderless (properties = {}) {
  return buttonSecondary(merge({
    borderColor: variables.colours.white
  }, properties))
}

export function buttonSecondaryTransparent (properties = {}) {
  return buttonSecondary(merge({
    backgroundColor: 'transparent',
    borderColor: variables.colours.white,
    color: variables.colours.white
  }, properties))
}

// Utility
export function jsonly (properties = {}) {
  return {
    '^.js': merge({}, properties)
  }
}

export function deButton (properties) {
  const deButtonBasic = {
    background: 'none',
    border: 'none'
  }
  return merge({}, deButtonBasic, properties || {})
}

export function deList (properties) {
  const deListBasic = {
    listStyle: 'none',
    margin: '0',
    padding: '0'
  }
  return merge({}, deListBasic, properties || {})
}

export function deLink (properties) {
  const deLinkBasic = {
    textDecoration: 'none'
  }
  return merge({}, deLinkBasic, properties || {})
}

export function linkImage (image) {
  return `url('${variables.assets.images}${image}')`
}

export function makePsuedoElement (properties) {
  const psuedoBasic = {
    content: `''`,
    display: 'block',
    position: 'relative'
  }
  return merge({}, psuedoBasic, properties || {})
}

function underlineSquiggle (psuedoElementName, image, xOffset, properties) {
  const psuedoElementProperties = {
    backgroundImage: linkImage(image),
    backgroundPosition: `0% ${xOffset}`,
    backgroundRepeat: 'no-repeat',
    height: variables.padding.e,
    left: '0',
    position: 'absolute',
    width: '100%'
  }

  if (psuedoElementName === '::after') {
    psuedoElementProperties.bottom = `calc(${variables.padding.e} * -1)`
  } else {
    psuedoElementProperties.top = `calc(${variables.padding.e} * -1)`
  }

  const psuedoElement = makePsuedoElement(psuedoElementProperties)

  const main = {
    position: 'relative',
    [psuedoElementName]: psuedoElement
  }

  return merge({}, main, properties || {})
}

export function afterUnderlineSquiggle (image, xOffset, properties) {
  return underlineSquiggle('::after', image, xOffset, properties)
}

export function beforeUnderlineSquiggle (image, xOffset, properties) {
  return underlineSquiggle('::before', image, xOffset, properties)
}

export function beforeBackgroundSquiggle (image, properties) {
  const before = makePsuedoElement({
    backgroundImage: linkImage(image),
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: variables.padding.d,
    left: '-10%',
    position: 'absolute',
    top: `calc(${variables.padding.d} * -1)`,
    width: '120%'
  })

  const main = {
    position: 'relative',
    '::before': before
  }

  return merge({}, main, properties || {})
}

export function makeTransition (transition = {
  details: variables.transitions.bouncy,
  properties: ['all']
}, properties) {
  const transitionBase = {
    transition: `${transition.properties.join(' ')} ${transition.details.length} ${transition.details.easing}`
  }
  return merge({}, transitionBase, properties)
}

export function makeGreyBackground (properties = {}) {
  const greyBackgroundBase = flexColumn(beforeBackgroundSquiggle('bg-wiggle-light-grey.svg', {
    backgroundColor: variables.colours.lighterGrey
  }))

  return merge({}, greyBackgroundBase, properties)
}

export function makeOrangeBackground (properties = {}) {
  const orangeBackgroundBase = flexColumn(beforeBackgroundSquiggle('bg-wiggle-mid-red.svg', {
    backgroundColor: variables.colours.midRed
  }))

  return merge({}, orangeBackgroundBase, properties)
}

function makeWobbleBox (image) {
  return {
    backgroundImage: linkImage(image),
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    margin: `${variables.padding.d} 0 0 0`,
    padding: variables.padding.c,
    textAlign: 'center'
  }
}

export function makeRoyalBlueWobbleBox (properties = {}) {
  return merge(makeWobbleBox('blue-wobbly-box.svg'), properties)
}

export function makeGreyWobbleBox (properties = {}) {
  return merge(makeWobbleBox('grey-wobble-box-mobile.svg'), properties)
}

export function makeOr (properties = {}) {
  return merge({
    backgroundImage: linkImage('cta-separator-line.svg'),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: variables.colours.white,
    display: 'block',
    padding: (variables.padding.c + ' ' + variables.padding.a),
    textAlign: 'center'
  }, headings.p, properties)
}

export function makeOrDark (properties = {}) {
  return makeOr(merge({
    backgroundImage: linkImage('cta-separator-line-charcoal.svg'),
    color: variables.colours.charcoal
  }, properties))
}

function subtitleUnderline (image, backgroundColour) {
  return {
    backgroundImage: linkImage('table-line-1.svg'),
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    display: 'inline-block',
    marginBottom: `calc(${variables.padding.d} - 2px)`,
    paddingBottom: '2px',
    textAlign: 'center',
    textShadow: `-2px 0px ${backgroundColour}, -2px 2px ${backgroundColour}, 2px -2px ${backgroundColour}, 2px 2px ${backgroundColour}`
  }
}

export function makeOrangeSubtitleUnderline (properties = {}) {
  const underline = subtitleUnderline('table-line-1.svg', variables.colours.white)
  return merge(underline, properties)
}

export function makeOrangeSubtitleUnderlineOnGrey (properties = {}) {
  const underline = subtitleUnderline('table-line-1.svg', variables.colours.lighterGrey)
  return merge(underline, properties)
}

export function makeOrangeSubtitleUnderlineOnDarkGrey (properties = {}) {
  const underline = subtitleUnderline('table-line-1.svg', variables.colours.charcoal)
  return merge(underline, properties)
}

export function underlineHoverTransition (properties = {}) {
  const backgroundImage = properties.backgroundImage
  return merge({}, properties, {
    [breakpoints.ns]: {
      backgroundImage: 'none',
      ':hover': { backgroundImage }
    }
  }, makeTransition({
    details: variables.transitions.mediumBouncy,
    properties: ['all']
  }))
}

// Generic typography
const typography = {
  title: merge({
    color: variables.colours.royalBlue,
    padding: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center'
  }, headings.h2),
  subtitle: merge({
    color: variables.colours.charcoal,
    margin: `0 0 ${variables.padding.c} 0`,
    textAlign: 'center'
  }, headings.h4Light),
  h3: merge({
    color: variables.colours.royalBlue,
    margin: '0',
    padding: `0 0 ${variables.padding.d} 0`
  }, headings.h3),
  copy: merge({
    color: variables.colours.charcoal,
    margin: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center'
  }, headings.p),
  copyLink: deLink({
    color: variables.colours.midRed
  })
}

typography.titleCharcoal = merge({}, typography.title, {
  color: variables.colours.charcoal
})

typography.titleWhite = merge({}, typography.title, {
  color: variables.colours.white
})

export { typography }

export function textHighlight (properties = {}) {
  return merge({}, {
    color: variables.colours.midRed
  }, properties)
}

// Form-related
const fieldWrap = {
  margin: `0 0 ${variables.padding.d} 0`,
  width: '100%'
}

const fieldWrapShort = {
  width: '50%'
}

const formRadioPrettyLabelCheckedSize = `calc(${variables.sizes.radioButtonBorderSize} - ${variables.sizes.radioButtonBorderWidth} * 4)`
const formRadioPrettyLabelChecked = makePsuedoElement({
  backgroundColor: variables.colours.midRed,
  borderRadius: '100%',
  height: formRadioPrettyLabelCheckedSize,
  left: `${variables.sizes.radioButtonBorderWidth}`,
  position: 'absolute',
  top: `${variables.sizes.radioButtonBorderWidth}`,
  width: formRadioPrettyLabelCheckedSize
})

const forms = {
  // Containers
  buttonsHolder: {
    textAlign: 'center'
  },
  fieldSet: makeGreyBackground({
    border: 'none',
    padding: `${variables.padding.c} 0 ${variables.padding.b} 0`
  }),
  fieldWrap: fieldWrap,
  fieldWrapContainer: basicContainerSmaller({
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: variables.padding.c
  }),
  fieldWrapShortEven: merge({
    [breakpoints.ns]: merge({
      paddingLeft: variables.padding.d
    }, fieldWrapShort)
  }, fieldWrap),
  fieldWrapShortOdd: merge({
    [breakpoints.ns]: merge({
      paddingRight: variables.padding.d
    }, fieldWrapShort)
  }, fieldWrap),
  radioList: deList({
    display: 'flex',
    flexWrap: 'wrap'
  }),
  radioItem: {
    alignItems: 'center',
    display: 'flex',
    padding: `0 ${variables.padding.d} ${variables.padding.d} 0`, // might be .e
    position: 'relative',
    width: '100%',
    [breakpoints.ns]: {
      width: '50%'
    }
  },
  // Inputs
  inputText: merge({
    backgroundColor: variables.colours.white,
    border: `${variables.sizes.formsInputBorderWidth} solid ${variables.colours.moonGrey}`,
    borderRadius: variables.sizes.formsInputBorderRadius,
    color: variables.colours.royalBlue,
    padding: variables.padding.d,
    width: '100%',
    ':focus': {
      borderColor: variables.colours.royalBlue,
      boxShadow: `0 0.5px ${variables.padding.e} 0 rgba(0, 0, 0, 0.2)`,
      outline: 'none'
    }
  }, headings.p2),
  inputRadio: {
    opacity: '0',
    position: 'absolute',
    ':checked + label:after': formRadioPrettyLabelChecked
  },
  inputRadioLabel: {
    border: `${variables.sizes.radioButtonBorderWidth} solid ${variables.colours.moonGrey}`,
    borderRadius: '100%',
    cursor: 'pointer',
    height: variables.sizes.radioButtonBorderSize,
    marginRight: variables.padding.e,
    position: 'relative',
    width: variables.sizes.radioButtonBorderSize
  },
  // Labels
  label: merge({
    color: variables.colours.charcoal,
    display: 'block',
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.p2),
  labelRadio: merge({
    color: variables.colours.royalBlue,
    cursor: 'pointer'
  }, headings.p2)
}

forms.helperText = merge({}, forms.label)

export { forms }

// Table

const tableCell = merge({}, headings.p, {
  color: variables.colours.royalBlue,
  padding: `${variables.padding.d} 0`,
  textAlign: 'center',
  [breakpoints.s]: { // max-width override
    fontSize: headings.p2.fontSize
  }
})

const tableCellBold = merge({}, tableCell, headings.pBold)

const tableUnderline = afterUnderlineSquiggle('table-line-1.svg', '0%', {
  '::after': {
    bottom: '-6px',
    height: '12px',
    width: `calc(100vw - ${variables.padding.d} * 2)`,
    [breakpoints.l]: {
      width: variables.sizes.contentMaxWidth
    }
  }
})

const tableHeaderFirst = merge({}, tableCellBold, tableUnderline)
const tableCellLeftFinal = merge({}, tableCell, {
  textAlign: 'left'
})
const tableCellLeft = merge({}, tableCellLeftFinal, tableUnderline)

const basicTable = {
  table: {
    borderCollapse: 'collapse',
    width: '100%'
  },
  tableHeaderRow: {},
  tableHeaderFirst: tableHeaderFirst,
  tableHeader: tableCellBold,
  tableBody: {
    position: 'relative'
  },
  tableRow: {},
  tableCell,
  tableCellBold,
  tableCellLeft,
  tableCellLeftFinal
}

export {basicTable}

const linkContainer = merge({}, headings.p, {
  backgroundColor: variables.colours.lighterGrey,
  borderColor: 'transparent',
  borderRadius: variables.sizes.formsInputBorderRadius,
  color: variables.colours.charcoal,
  fontFamily: 'monospace',
  margin: `0 0 ${variables.padding.c} 0`,
  overflow: 'hidden',
  padding: variables.padding.e,
  textOverflow: 'ellipsis',
  width: '100%',
  whiteSpace: 'nowrap'
})

export {linkContainer}

const quickAppear = {
  details: variables.transitions.slowBouncy,
  properties: ['all']
}

const appear = function () {
  return jsonly(merge({}, makeTransition(quickAppear), {
    opacity: '1',
    transform: 'translate3d(0, 0, 0)'
  }))
}

const disappear = function (direction = 'right') {
  const full = variables.animationInformation.genericFullOffset
  let xy = `${full}%, 0`

  switch (direction) {
    case 'bottom':
      xy = `0, ${full}%`
      break
    case 'left':
      xy = `${full * -1}%, 0`
      break
    case 'top':
      xy = `0, ${full * -1}%`
      break
    default:
      break
  }

  return jsonly(merge({}, makeTransition(quickAppear), {
    opacity: '0',
    transform: `translate3d(${xy}, 0)`
  }))
}

const animations = {
  appearTop: {
    '0%': {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0)'
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0)'
    }
  }
}

export { appear, disappear, animations }
