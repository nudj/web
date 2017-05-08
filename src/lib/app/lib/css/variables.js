export const assets = {
  fonts: '/assets/fonts/',
  images: '/assets/images/'
}

export const breakpoints = {
  medium: '30em',
  large: '60em'
}

export const colours = {
  beige: '#efebd3',
  charcoal: '#2d2926',
  darkPink: '#ef6079',
  lightGrey: '#d0d0ce',
  lightYellow: '#f7ea48',
  midRed: '#e35205',
  navy: '#081f2c',
  navyBlue: '#002051',
  royalBlue: '#002d72',
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
  buttonMinWidth: '200px',
  contentMaxWidth: '980px',
  columnWidth: '80',
  paddingWidth: '20'
}

export const padding = {
  a: (sizes.paddingWidth * 4) + 'px',
  b: (sizes.paddingWidth * 3) + 'px',
  c: (sizes.paddingWidth * 2) + 'px',
  d: sizes.paddingWidth + 'px'
}

export const transitions = {
  bouncey: {
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    length: '0.275s'
  }
}

export const zIndicies = {
  header: '998',
  mobileMenu: '999'
}
