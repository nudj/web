module.exports.assets = {
  fonts: '/assets/fonts/',
  images: '/assets/images/'
}

module.exports.breakpoints = {
  medium: '30em',
  large: '60em',
  xl: '90em'
}

module.exports.colors = {
  beige: '#efebd3',
  charcoal: '#2d2926',
  charcoalTint2: '#817f7d',
  darkPink: '#8f3a49',
  grey: '#ececeb',
  green: '#7ac74f',
  lightGrey: '#d0d0ce',
  lighterGrey: '#f7f7f6',
  lightPink: '#f5a0af',
  lightYellow: '#f7ea48',
  midRed: '#e35205',
  midGrey: '#ced2d5',
  moonGrey: '#ccc',
  navy: '#081f2c',
  navyBlue: '#002051',
  offWhite: '#fafafa',
  offGrey: '#f6f6f5',
  pink: '#ef6079',
  royalBlue: '#002d72',
  royalBlueFade: '#6681aa',
  white: '#fff',
  //
  genericBoxShadow: 'rgba(0, 0, 0, 0.1)',
  genericOverlayCover: 'rgba(45, 41, 38, 0.4)',
  genericLightShade: 'rgba(45, 41, 38, 0.2)',
  royalBlueShade: 'rgba(77, 108, 157, 0.1)'
}

module.exports.fonts = {
  jan: {
    'light': {
      files: {
        eot: 'F37Jan-Light.eot',
        ttf: 'F37Jan-Light.ttf',
        woff: 'F37Jan-Light.woff',
        woff2: 'F37Jan-Light.woff2'
      },
      style: 'normal',
      weight: '200'
    },
    'lightItalic': {
      files: {
        eot: 'F37Jan-LightItalic.eot',
        ttf: 'F37Jan-LightItalic.ttf',
        woff: 'F37Jan-LightItalic.woff',
        woff2: 'F37Jan-LightItalic.woff2'
      },
      style: 'italic',
      weight: '200'
    },
    'regular': {
      files: {
        eot: 'F37Jan-Regular.eot',
        ttf: 'F37Jan-Regular.ttf',
        woff: 'F37Jan-Regular.woff',
        woff2: 'F37Jan-Regular.woff2'
      },
      style: 'normal',
      weight: '400'
    },
    'regularItalic': {
      files: {
        eot: 'F37Jan-RegularItalic.eot',
        ttf: 'F37Jan-RegularItalic.ttf',
        woff: 'F37Jan-RegularItalic.woff',
        woff2: 'F37Jan-RegularItalic.woff2'
      },
      style: 'italic',
      weight: '400'
    },
    'bold': {
      files: {
        eot: 'F37Jan-Bold.eot',
        ttf: 'F37Jan-Bold.ttf',
        woff: 'F37Jan-Bold.woff',
        woff2: 'F37Jan-Bold.woff2'
      },
      style: 'normal',
      weight: '700'
    },
    'boldItalic': {
      files: {
        eot: 'F37Jan-BoldItalic.eot',
        ttf: 'F37Jan-BoldItalic.ttf',
        woff: 'F37Jan-BoldItalic.woff',
        woff2: 'F37Jan-BoldItalic.woff2'
      },
      style: 'italic',
      weight: '700'
    }
  }
}

module.exports.fontSizes = {
  f1: '46px',
  f2: '42px',
  f3: '30px',
  f4: '26px',
  f5: '24px',
  f6: '18px',
  f7: '16px',
  f8: '14px',
  f9: '12px'
}

const basePixelSize = 20
module.exports.sizing = {
  basePadding: `${basePixelSize}px`,
  baseBorderRadius: '4px',
  baseBorderWidth: '2px',
  buttonBorderRadius: '9999px',
  buttonBorderWidth: '2px',
  detailSeparatorWidth: '1px',
  fixedHeaderWidth: `${basePixelSize * 6}px`,
  fixedHeaderButtonSize: `${basePixelSize * 3.5}px`,
  fixedHeaderButtonIconSize: `${basePixelSize * 1.5}px`,
  genericBoxShadow: '0 0.5px 0.5px 0',
  overlayDialogWidth: '500px',
  sidebarWidth: '285px',
  squishedSidebarWidth: '160px',
  notificationTop: `${basePixelSize * 1.5}px`,
  textEditorLineHeight: '1.5rem',
  buttonMinWidth: '120px'
}

module.exports.sizes = {
  buttonBorderWidth: '2px',
  buttonMinWidth: '200px',
  contentMaxWidth: '980px',
  contentMediumMaxWidth: '720px',
  columnWidth: '80',
  copyLineHeight: '1.5rem',
  formsMaxWidth: '512px',
  formsInputBorderWidth: '1px',
  formsInputBorderRadius: '4px',
  genericBoxShadow: '0 0.5px 0.5px 0',
  magicBorderRadius: '9999px',
  mobileActionButtonsHeight: '24px',
  paddingWidth: '20',
  radioButtonBorderSize: '20px',
  radioButtonBorderWidth: '2px'
}

module.exports.padding = {
  a: (module.exports.sizes.paddingWidth * 8) + 'px',
  b: (module.exports.sizes.paddingWidth * 4) + 'px',
  c: (module.exports.sizes.paddingWidth * 2) + 'px',
  d: module.exports.sizes.paddingWidth + 'px',
  de: (module.exports.sizes.paddingWidth * 0.75) + 'px',
  e: (module.exports.sizes.paddingWidth * 0.5) + 'px',
  f: (module.exports.sizes.paddingWidth * 0.25) + 'px'
}

module.exports.transitions = {
  bouncy: {
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    length: '0.275s'
  },
  mediumBouncy: {
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    length: '0.5s'
  },
  slowBouncy: {
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    length: '0.75s'
  },
  easy: {
    easing: 'cubic-bezier(0.41, 0, 0.5, 1)',
    length: '0.275s'
  },
  mediumEasy: {
    easing: 'cubic-bezier(0.41, 0, 0.5, 1)',
    length: '0.5s'
  },
  slowEasy: {
    easing: 'cubic-bezier(0.41, 0, 0.5, 1)',
    length: '0.75s'
  }
}

module.exports.animationInformation = {
  genericFullOffset: 25
}

module.exports.buttonHoverOptionSVGs = [
  'cta-1',
  'cta-2',
  'cta-3',
  'cta-4',
  'cta-5',
  'cta-6'
]

module.exports.zIndicies = {
  header: '997',
  mobileMenu: '998',
  mobileMenuConstant: '999'
}
