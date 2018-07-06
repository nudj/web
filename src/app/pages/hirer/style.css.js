const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const heroImagePath = 'hirer-page/fist-bump-group.svg'
const heroImagePosition = 'bottom center'
const heroImageHeight = '10.5265rem'

const takeawayImagePath = 'thumbs-up-right.svg'
const takeawayImageHeight = '15.5rem'

const oneFingerPath = 'hirer-page/one-finger.svg'
const twoFingersPath = 'hirer-page/two-fingers.svg'
const threeFingersPath = 'hirer-page/three-fingers.svg'

const heroFisting = merge({
  backgroundColor: variables.colors.midRed,
  marginBottom: `calc(${heroImageHeight} * 0.5)`,
  paddingTop: variables.padding.b,
  paddingBottom: variables.padding.a,
  paddingLeft: variables.padding.d,
  paddingRight: variables.padding.d,
  position: 'relative',
  '::after': mixins.makePsuedoElement({
    backgroundImage: mixins.linkImage(heroImagePath),
    backgroundPosition: heroImagePosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    bottom: `calc(${heroImageHeight} * -0.5)`,
    height: heroImageHeight,
    left: '0',
    position: 'absolute',
    width: '100vw'
  })
})

const heroSubtitle = merge({
  color: variables.colors.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h2)

const subtitle = merge({
  color: variables.colors.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h4)

const subtitleWhite = merge({}, subtitle, {
  color: variables.colors.white
})

const subtitleUnderline = merge(mixins.makeOrangeSubtitleUnderline(), {
  '@media(max-width: 28.125rem)': {
    backgroundImage: 'none',
    textShadow: 'none'
  }
})

const stepContainer = mixins.basicContainer({
  paddingTop: '4rem',
  paddingBottom: '0',
  paddingLeft: 0,
  paddingRight: 0,
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column-reverse',
  [mixins.breakpoints.ns]: {
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingTop: '8rem',
    alignItems: 'center',
    textAlign: 'inherit'
  }
})

const stepCopy = merge({
  marginLeft: 'auto',
  marginRight: 'auto',
  color: variables.colors.charcoal,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.p)

const stepImage = {
  padding: `0 0 ${variables.padding.c} 0`,
  width: '100%',
  [mixins.breakpoints.ns]: {
    width: `calc(50% - ${variables.padding.c})`
  }
}

const deList = mixins.deList()

const styles = {
  body: {
    position: 'relative' // ?
  },
  red: mixins.textHighlight(),
  standardBreak: {
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'inline-block'
    }
  },
  numberBreak: {
    display: 'inline-block',
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  // Hero
  hero: heroFisting,
  heroTitle: merge({
    color: variables.colors.white,
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.e,
    textAlign: 'center'
  }, mixins.headings.h2),
  heroSubtitle: merge({
    color: variables.colors.white,
    textAlign: 'center'
  }, mixins.headings.h5Light),
  heroCta: mixins.flexColumn({
    paddingTop: variables.padding.c
  }),
  // Takeaways
  takeaway: mixins.basicContainer({
    paddingTop: variables.padding.b,
    '@media(max-width: 60rem)': {
      paddingBottom: takeawayImageHeight
    },
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.a
    },
    position: 'relative',
    '::after': mixins.makePsuedoElement({
      position: 'absolute',
      backgroundImage: mixins.linkImage(takeawayImagePath),
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom left',
      height: takeawayImageHeight,
      left: '-15rem',
      width: '150vw',
      '@media(max-width: 32.5rem)': {
        left: '-25rem',
        width: '220vw'
      }
    }),
    '@media(min-width: 60rem)': {
      '::after': mixins.makePsuedoElement({
        backgroundImage: mixins.linkImage(takeawayImagePath),
        backgroundPosition: 'bottom left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        bottom: '0.5rem',
        height: takeawayImageHeight,
        left: '-25rem',
        position: 'absolute',
        width: '100vw'
      })
    }}),
  takeawayLeft: {
    [mixins.breakpoints.l]: {
      width: '50%',
      textAlign: 'left',
      verticalAlign: 'top'
    },
    width: '100%',
    paddingLeft: '0',
    textAlign: 'center',
    display: 'inline-block'
  },
  takeawayRight: {
    width: '100%',
    textAlign: 'left',
    display: 'block',
    paddingTop: variables.padding.c,
    margin: '0 auto',
    maxWidth: variables.sizes.contentMediumMaxWidth,
    [mixins.breakpoints.l]: {
      width: '50%',
      verticalAlign: 'top',
      display: 'inline-block'
    },
    [mixins.breakpoints.ns]: {
      paddingTop: '0'
    }
  },
  benefits: deList,
  // Section: How nudj works
  how: mixins.basicContainerLarge({
    width: '100%',
    paddingTop: variables.padding.b,
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d,
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.a
    }
  }),
  bodyTitle: merge({}, heroSubtitle, subtitleUnderline),
  howUnderline: {},
  bodySubtitle: merge({
    color: variables.colors.charcoal,
    paddingBottom: variables.padding.c,
    [mixins.breakpoints.ns]: {
      paddingBottom: variables.padding.b
    }
  }, mixins.headings.h5Light),
  pricingSubtitle: merge({}, stepCopy, {
    color: variables.colors.white,
    textAlign: 'center'
  }),
  steps: mixins.deList({
    paddingBottom: variables.padding.b,
    '::after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage('hirer-page/page-break-img.svg'),
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      height: '23px',
      width: '100vw',
      marginTop: variables.padding.b,
      [mixins.breakpoints.l]: {
        width: '100%'
      }
    })
  }),
  step: stepContainer,
  stepDescription: {
    maxWidth: '36rem',
    textAlign: 'left',
    [mixins.breakpoints.ns]: {
      padding: 0,
      textAlign: 'center',
      width: '100%'
    }
  },
  stepTitle: subtitle,
  stepNumber: mixins.textHighlight({
    display: 'block',
    [mixins.breakpoints.ns]: {
      display: 'inline'
    }
  }),
  stepCopy: stepCopy,
  stepImage: stepImage,
  stepImageReverse: stepImage,
  stepImageBottom: merge({}, stepImage, {
    [mixins.breakpoints.ns]: {
      width: '60%'
    }
  }),
  footerImage: {},
  compare: mixins.basicContainerMedium({
    width: '100%',
    paddingTop: variables.padding.c
  }),
  // Section: Compare
  header: {
    textAlign: 'center'
  },
  compareUnderline: {},
  dataPoints: deList,
  dataPoint: {
    paddingTop: variables.padding.d,
    paddingBottom: variables.padding.d
  },
  bodyNudj: merge({
    paddingBottom: variables.padding.c,
    textAlign: 'center'
  }, mixins.headings.small),
  // Section: Clients
  clients: {
    paddingBottom: variables.padding.b,
    [mixins.breakpoints.ns]: {
      paddingBottom: variables.padding.a
    }
  },
  logoWrapper: merge(mixins.basicContainerMedium(), {
    width: '100%',
    '@media(max-width: 38rem)': {
      maxWidth: '300px',
      margin: '0 auto'
    }
  }),
  brand: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '0 auto',
    width: '100%',
    paddingBottom: variables.padding.b,
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d,
    '@media(min-width: 38rem)': {
      paddingBottom: '0',
      width: '33%'
    },
    ':last-child': {
      paddingBottom: '0'
    }
  },
  // Section: The power of referrals
  referrals: mixins.basicContainerLarge({
    width: '100%',
    paddingBottom: variables.padding.b
  }),
  // Sub-section: Bar chart
  barChart: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '68.75rem',
    margin: '0 auto',
    paddingBottom: variables.padding.b,
    paddingTop: variables.padding.d,
    [mixins.breakpoints.ns]: {
      paddingTop: '0'
    }
  },
  barArrows: {
    display: 'none',
    '@media(min-width: 69rem)': {
      display: 'block'
    }
  },
  chartImages: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: '1',
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    '@media(max-width: 25.75rem)': {
      paddingLeft: '0',
      paddingRight: '0',
      width: '100%'
    }
  },
  barLeft: {
    paddingBottom: variables.padding.c,
    '@media(min-width: 60.25rem)': {
      paddingBottom: '0'
    }
  },
  barRight: {
    paddingBottom: variables.padding.c,
    '@media(min-width: 60.25rem)': {
      paddingBottom: '0'
    }
  },
  keyTitle: merge({
    color: variables.colors.charcoal,
    display: 'block',
    '@media(min-width: 60.25rem)': {
      display: 'none'
    }
  }, mixins.headings.pBold),
  chartKey: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexGrow: '0',
    '@media(max-width: 60.25rem)': {
      flexDirection: 'row',
      flexGrow: '1',
      flexWrap: 'wrap'
    }
  },
  keyOther: {
    '@media(max-width: 30.625rem)': {
      maxWidth: '13.4375rem'
    }
  },
  keyReferrals: {
    '@media(max-width: 30.625rem)': {
      maxWidth: '13.4375rem',
      width: '100%'
    }
  },
  // Sub-section: Whys
  whys: merge(deList, {
    position: 'relative',
    maxWidth: variables.sizes.contentMediumMaxWidth,
    marginLeft: 'auto',
    marginBottom: '0',
    marginRight: 'auto',
    width: '100%'
  }),
  why: {
    paddingBottom: variables.padding.d,
    ':first-child:after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage(oneFingerPath),
      backgroundPosition: 'top right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      top: '0',
      height: '15.5rem',
      right: '-36rem',
      position: 'absolute',
      width: '100vw'
    }),
    ':nth-child(2):after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage(twoFingersPath),
      backgroundPosition: 'top left',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      top: '8rem',
      height: '15.5rem',
      left: '-34rem',
      position: 'absolute',
      width: '100vw'
    }),
    ':nth-child(3):after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage(threeFingersPath),
      backgroundPosition: 'bottom right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      bottom: '-15rem',
      height: '25rem',
      right: '-10rem',
      position: 'absolute',
      width: '100vw'
    })
  },
  // Section: Pricing
  pricingTitle: merge({
    color: variables.colors.white,
    paddingBottom: variables.padding.d
  }, mixins.headings.h2),
  pricing: mixins.makeOrangeBackground({
    padding: `${variables.padding.b} 0 ${variables.padding.c} 0`
  }),
  pricingContainer: mixins.flexColumn(mixins.basicContainer({
    textAlign: 'center',
    width: '100%'
  })),
  pricingBox: mixins.makeRoyalBlueWobbleBox(),
  price: subtitleWhite,
  pricingSmall: merge({
    color: variables.colors.white,
    textAlign: 'center'
  }, mixins.headings.small),
  cta: mixins.flexColumn({
    paddingTop: variables.padding.c,
    paddingBottom: variables.padding.c
  }),
  or: mixins.makeOr(),
  signup: mixins.buttonPrimary(),
  contact: mixins.buttonSecondaryBorderless(),
  stepSupportingImagery: {
    width: '100%'
  },
  stepVideoContainer: {
    height: '0',
    paddingBottom: '56.25%', // 16:9 ratio
    position: 'relative',
    width: '100%',
    marginTop: variables.padding.d
  }
}

module.exports = css(styles)
