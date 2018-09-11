const { StyleSheet, colors, sizes, typography } = require('@nudj/components/lib/css')
const smallSvg = 'assets/app/pages/home/small.svg'
const combinedSvg = 'assets/app/pages/home/combined.svg'
const whatToExpectUnderlineSvg = 'assets/app/pages/home/what-to-expect-underline.svg'
const clientsIncludeUnderlineSvg = 'assets/app/pages/home/clients-include-underline.svg'
const referralSchemeTopUnderlineSvg = 'assets/app/pages/home/referral-scheme-top-underline.svg'
const referralSchemeBottomUnderlineSvg = 'assets/app/pages/home/referral-scheme-bottom-underline.svg'

const styleSheet = StyleSheet.create({
  root: {
    height: '100%'
  },
  /**
   * Generic
   */
  sectionH1: {
    ...typography.type.largeIv,
    maxWidth: '42.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    '@media(min-width: 42.5rem)': typography.type.largeV
  },
  sectionH2: {
    ...typography.type.largeI,
    '@media(min-width: 42.5rem)': typography.type.largeIi
  },
  sectionSubtitle: {
    maxWidth: '32.9375rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  underlineBgWhite: {
    backgroundImage: `linear-gradient(${colors.white} 50%, ${colors.midRed} 50%)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '6px 6px',
    backgroundPosition: 'left bottom 1%',
    textShadow: `-2px -2px ${colors.white}, -2px 2px ${colors.white}, 2px -2px ${colors.white}, 2px 2px ${colors.white}`
  },
  underlineBgGrey: {
    backgroundImage: `linear-gradient(${colors.greyLightest} 50%, ${colors.midRed} 50%)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '6px 6px',
    backgroundPosition: 'left bottom 1%',
    textShadow: `-2px -2px ${colors.greyLightest}, -2px 2px ${colors.greyLightest}, 2px -2px ${colors.greyLightest}, 2px 2px ${colors.greyLightest}`
  },
  section: {
    marginTop: sizes.largeV,
    '@media(min-width: 42.5rem)': {
      marginTop: sizes.largeViii
    }
  },
  /**
   * Header
   */
  header: {
    marginTop: sizes.regular,
    paddingBottom: sizes.largeViii,
    maxWidth: '73.625rem',
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    backgroundImage: `url(${smallSvg})`,
    backgroundSize: 'calc(100% - 2rem)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '1rem bottom',
    '@media(min-width: 21.125rem)': {
      paddingBottom: sizes.largeIx
    },
    '@media(min-width: 32rem)': {
      display: 'flex',
      paddingTop: sizes.largeIv,
      paddingBottom: sizes.largeViii,
      backgroundSize: '30rem',
      backgroundPosition: 'right 1rem bottom 0'

    },
    '@media(min-width: 42.5rem)': {
      paddingLeft: sizes.largeIi,
      paddingRight: sizes.largeIi
    },
    '@media(min-width: 66.5rem)': {
      paddingTop: sizes.largeIx,
      paddingBottom: sizes.largeIx,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundPosition: `1rem center`,
      backgroundImage: `url(${combinedSvg})`,
      backgroundSize: '60rem'
    },
    '@media(min-width: 70.75rem)': {
      backgroundSize: '100%'
    }
  },
  headerContent: {
    maxWidth: '32.9375rem',
    '@media(min-width: 42.5rem)': {
      width: '60%'
    }
  },
  title: {
    ...typography.type.largeIv,
    maxWidth: '32.9375rem',
    textShadow: '-2px -2px #fff, -2px 2px #fff, 2px -2px #fff, 2px 2px #fff',
    '@media(min-width: 42.5rem)': typography.type.largeV
  },
  subtitle: {
    maxWidth: '32.9375rem',
    textShadow: '-2px -2px #fff, -2px 2px #fff, 2px -2px #fff, 2px 2px #fff',
    '@media(min-width: 24.75rem)': {
      maxWidth: '70%'
    },
    '@media(min-width: 42.5rem)': {
      maxWidth: '100%'
    }
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: sizes.largeIii,
    '@media(min-width: 50rem)': {
      flexDirection: 'row'
    }
  },
  cta: {
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    },
    '@media(min-width: 50rem)': {
      ':nth-of-type(n + 2)': {
        marginTop: 0,
        marginLeft: sizes.regular
      }
    }
  },
  /**
   * What to expect
   */
  whatToExpectUnderline: {
    '@media(min-width: 46.5rem)': {
      backgroundImage: `url(${whatToExpectUnderlineSvg})`,
      backgroundPosition: 'left 50.5% top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '145% 100%'
    }
  },
  statistics: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: sizes.regular,
    '@media(min-width: 32rem)': {
      flexDirection: 'row',
      marginLeft: `-${sizes.regular}`,
      marginRight: `-${sizes.regular}`,
      flexWrap: 'wrap'
    }
  },
  statisticContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    paddingTop: sizes.regular,
    paddingBottom: sizes.regular,
    textAlign: 'center',
    '@media(min-width: 32rem)': {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      width: '50%'
    },
    '@media(min-width: 66.5rem)': {
      width: '33.3333%'
    }
  },
  statistic: {
    ...typography.type.largeIv,
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media(min-width: 32rem)': {
      ...typography.type.largeV
    }
  },
  statistic2: {
    ':before': {
      transform: 'rotate(45deg)'
    }
  },
  statistic3: {
    ':before': {
      transform: 'rotate(90deg)'
    }
  },
  statisticDescription: {
    ...typography.type.regular,
    color: colors.text,
    marginTop: sizes.regular,
    marginLeft: 0,
    maxWidth: '28.125rem',
    '@media(min-width: 32rem)': {
      maxWidth: '100%'
    }
  },
  /**
   * Social proof
   */
  clientsIncludeUnderline: {
    '@media(min-width: 46.5rem)': {
      backgroundImage: `url(${clientsIncludeUnderlineSvg})`,
      backgroundPosition: 'left 50.5% top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '194% 98%'
    }
  },
  clientGrid: {
    maxWidth: '59.625rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  quote: {
    maxWidth: '35.625rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: sizes.largeV
  },
  citation: {
    marginTop: sizes.largeIi,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  /**
   * Business scenarios
   */
  businessScenarioTopUnderline: {
    '@media(min-width: 46.5rem)': {
      backgroundImage: `url(${referralSchemeTopUnderlineSvg})`,
      backgroundPosition: 'left 46.5% top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '140% 98%'
    }
  },
  businessScenarioBottomUnderline: {
    '@media(min-width: 46.5rem)': {
      whiteSpace: 'no-wrap',
      backgroundImage: `url(${referralSchemeBottomUnderlineSvg})`,
      backgroundPosition: 'left 41.5% top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '110% 98%'
    }
  },
  scenario: {
    maxWidth: '35.75rem',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: sizes.largeV,
    '@media(min-width: 42.5rem)': {
      marginTop: sizes.largeViii
    }
  },
  /**
   * Pricing
   */
  pricingBox: {
    marginTop: sizes.largeIv,
    maxWidth: '25.5rem',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.white,
    ':before': {
      opacity: 0.25
    }
  },
  pricingCtaGroup: {
    maxWidth: '25.5rem',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  }
})

module.exports = styleSheet
