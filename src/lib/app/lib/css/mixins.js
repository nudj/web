import { merge } from '../css'

import * as variables from './variables'

// Breakpoints
export const breakpoints = {
  ns: `@media screen and (min-width: ${variables.breakpoints.medium})`,
  m: `@media screen and (min-width: ${variables.breakpoints.medium})`,
  l: `@media screen and (min-width: ${variables.breakpoints.large})`
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
    fontFamilies[variation] = createFontFamily(name, font[variation])
  }
  return fontFamilies
}

const fonts = {
  jan: createFont('jan', variables.fonts.jan)
}

export const headings = {
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
    fontFamily: [fonts.jan.regular],
    fontSize: variables.fontSizes.f5,
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
    fontFamily: [fonts.jan.regular],
    fontSize: variables.fontSizes.f6,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f7
    }
  }
}

// Layout
export function basicContainer (properties) {
  const basicContainerBasic = {
    padding: '0 20px',
    position: 'relative',
    [breakpoints.ns]: {
      margin: '0 auto',
      maxWidth: variables.sizes.contentMaxWidth
    }
  }
  return merge({}, basicContainerBasic, properties || {})
}

export function flexColumn (properties) {
  const flexColumnBasic = {
    display: 'flex', // flex
    flex: '1 1 auto', // flex-auto
    flexDirection: 'column', // flex-column
    justifyContent: 'center' // justify-center
  }
  return merge({}, flexColumnBasic, properties || {})
}

// Buttons
export function button (properties) {
  const buttonBasic = {
    borderRadius: '9999px',
    display: 'inline-block',
    minWidth: variables.sizes.buttonMinWidth,
    padding: '20px 40px',
    textAlign: 'center'
  }
  return merge({}, deLink(buttonBasic), headings.h6, properties || {})
}

export function buttonPrimary (properties) {
  const buttonPrimary = {
    backgroundColor: variables.colours.royalBlue,
    color: variables.colours.white
  }
  return merge({}, button(buttonPrimary), properties || {})
}

export function buttonSecondary (properties) {
  const buttonSecondary = {
    backgroundColor: variables.colours.white,
    color: variables.colours.royalBlue
  }
  return merge({}, button(buttonSecondary), properties || {})
}

// Utility
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

export function beforeBackgroundSquiggle (image, properties) {
  const before = makePsuedoElement({
    backgroundImage: linkImage(image),
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '20px', // Move these numbers somewhere else
    left: '-10%',
    position: 'absolute',
    top: '-20px',
    width: '120%'
  })

  const main = {
    position: 'relative',
    // margin: '20px 0 0 0',
    '::before': before
  }

  return merge({}, main, properties || {})
}
