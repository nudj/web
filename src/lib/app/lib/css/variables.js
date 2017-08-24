export const assets = {
  fonts: '/assets/fonts/',
  images: '/assets/images/'
}

export const breakpoints = {
  medium: '30em',
  large: '60em',
  xl: '90em'
}

export const colours = {
  beige: '#efebd3',
  charcoal: '#2d2926',
  charcoalTint2: '#817f7d',
  darkPink: '#ef6079',
  lightGrey: '#d0d0ce',
  lighterGrey: '#f7f7f6',
  lightYellow: '#f7ea48',
  midRed: '#e35205',
  moonGrey: '#ccc',
  navy: '#081f2c',
  navyBlue: '#002051',
  royalBlue: '#002d72',
  royalBlueTint4: '#6681aa',
  white: '#fff'
}

export const fonts = {
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

export const fontSizes = {
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

export const sizes = {
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

export const padding = {
  a: (sizes.paddingWidth * 8) + 'px',
  b: (sizes.paddingWidth * 4) + 'px',
  c: (sizes.paddingWidth * 2) + 'px',
  d: sizes.paddingWidth + 'px',
  e: (sizes.paddingWidth * 0.5) + 'px',
  f: (sizes.paddingWidth * 0.25) + 'px'
}

export const transitions = {
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

export const animationInformation = {
  genericFullOffset: 25
}

export const buttonHoverOptionSVGs = [
  'cta-1',
  'cta-2',
  'cta-3',
  'cta-4',
  'cta-5',
  'cta-6'
]

export const zIndicies = {
  header: '997',
  mobileMenu: '998',
  mobileMenuConstant: '999'
}
