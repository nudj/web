import { merge } from '../css'

import * as variables from './variables'

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

export function createFont (name, font) {
  const fontFamilies = {}
  for (let variation in font) {
    fontFamilies[variation] = createFontFamily(name, font[variation])
  }
  return fontFamilies
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

export function flexColumn (properties) {
  const flexColumnBasic = {
    display: 'flex', // flex
    flex: '1 1 auto', // flex-auto
    flexDirection: 'column', // flex-column
    justifyContent: 'center' // justify-center
  }
  return merge({}, flexColumnBasic, properties || {})
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

export function beforeBackgroundSquiggle (image) {
  return makePsuedoElement({
    backgroundImage: linkImage(image),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '20px',
    left: '-10%',
    position: 'absolute',
    top: '-20px',
    width: '120%'
  })
}

export function button (properties) {
  const buttonBasic = {
    borderRadius: '100%'
  }
  return merge({}, deLink(buttonBasic), properties || {})
}

export function buttonPrimary () {
  const buttonPrimary = {
    backgroundColor: variables.colours.royalBlue,
    color: variables.colours.white
  }
  return button(buttonPrimary)
  // jan-bold f5 link no-underline ph5 pv3 bg-royal-blue br-pill white dim db ma3 from '@nudj/tachyons/css/tachyons.css';
}

export function buttonSecondary () {
  const buttonSecondary = {
    backgroundColor: variables.colours.white,
    color: variables.colours.royalBlue
  }
  return button(buttonSecondary)
}
