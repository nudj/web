import css, { merge, mixins, variables } from '../../lib/css'

const heroImagePath = 'hirer-page/fist-bump-group.svg'
const heroImagePosition = 'bottom center'
const heroImageHeight = '168px'

const heroFisting = merge({
  backgroundColor: variables.colours.midRed,
  marginBottom: `calc(${heroImageHeight} * 0.5)`,
  padding: `${variables.padding.b} 0 ${variables.padding.a} 0`,
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

const subtitle = merge({
  color: variables.colours.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h4)

const subtitleWhite = merge({}, subtitle, {
  color: variables.colours.white
})

const subtitleUnderline = {
  backgroundImage: mixins.linkImage('table-line-1.svg'),
  backgroundPosition: 'bottom center',
  backgroundRepeat: 'no-repeat',
  display: 'inline-block',
  marginBottom: `calc(${variables.padding.d} - 2px)`,
  paddingBottom: '2px',
  textAlign: 'center',
  textShadow: `-2px 0px ${variables.colours.white}, -2px 2px ${variables.colours.white}, 2px -2px ${variables.colours.white}, 2px 2px ${variables.colours.white}`
}

const stepContainer = mixins.basicContainer({
  padding: `${variables.padding.c} ${variables.padding.d} 0 ${variables.padding.d}`,
  textAlign: 'center',
  [mixins.breakpoints.ns]: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'inherit'
  }
})

const stepReverse = merge({
  [mixins.breakpoints.ns]: {
    flexDirection: 'row-reverse'
  }
}, stepContainer)

const stepBottom = merge({
  paddingBottom: variables.padding.c,
  [mixins.breakpoints.ns]: {
    flexDirection: 'column',
    paddingBottom: variables.padding.b
  }
}, stepContainer)

const stepCopy = merge({
  color: variables.colours.charcoal,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.p)

const stepImage = {
  padding: `0 0 ${variables.padding.d} 0`,
  width: '100%',
  [mixins.breakpoints.ns]: {
    width: `calc(50% - ${variables.padding.c})`
  }
}

const tableCell = merge({
  color: variables.colours.royalBlue,
  padding: `${variables.padding.d} 0`,
  textAlign: 'center'
}, mixins.headings.p2)

const tableCellBold = merge({}, tableCell, mixins.headings.p2Bold)

const tableUnderline = mixins.afterUnderlineSquiggle('table-line-1.svg', '0%', {
  '::after': {
    bottom: '-6px',
    height: '12px',
    width: `calc(100vw - ${variables.padding.d} * 2)`,
    [mixins.breakpoints.l]: {
      width: variables.sizes.contentMaxWidth
    }
  }
})

const tableHeaderFirst = merge({}, tableCellBold, tableUnderline)
const tableCellLeft = merge({}, tableCell, tableUnderline, {
  textAlign: 'left'
})

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
  heroTitle: merge({}, mixins.typography.titleWhite, mixins.basicContainer()),
  how: {
    padding: `${variables.padding.c} 0 0 0`,
    [mixins.breakpoints.ns]: {
      padding: `${variables.padding.b} 0 0 0`
    }
  },
  bodyTitle: merge({}, subtitle, subtitleUnderline),
  pricingTitle: subtitleWhite,
  howUnderline: {},
  bodySubtitle: merge({}, stepCopy, {
    textAlign: 'center'
  }),
  pricingSubtitle: merge({}, stepCopy, {
    color: variables.colours.white,
    textAlign: 'center'
  }),
  steps: mixins.deList({
    '::after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage('hirer-page/page-break-img.svg'),
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      height: '23px',
      width: '100vw',
      [mixins.breakpoints.l]: {
        width: '100%'
      }
    })
  }),
  step: stepContainer,
  stepReverse: stepReverse,
  stepBottom: stepBottom,
  stepDescription: {
    [mixins.breakpoints.ns]: {
      padding: `0 0 0 ${variables.padding.c}`,
      width: '50%'
    }
  },
  stepDescriptionReverse: {
    [mixins.breakpoints.ns]: {
      padding: `0 ${variables.padding.c} 0 0`,
      width: '50%'
    }
  },
  stepDescriptionBottom: {
    [mixins.breakpoints.ns]: {
      textAlign: 'center',
      width: '50%'
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
  compare: mixins.basicContainer({
    padding: `${variables.padding.c} ${variables.padding.d} ${variables.padding.d} ${variables.padding.d}`,
    [mixins.breakpoints.ns]: {
      padding: `${variables.padding.b} ${variables.padding.d} ${variables.padding.b} ${variables.padding.d}`
    }
  }),
  header: {
    textAlign: 'center'
  },
  compareUnderline: {},
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
  tableLeft: tableCellLeft,
  tableItem: tableCell,
  tableItemNudj: tableCellBold,
  bodyNudj: merge(mixins.textHighlight({
    padding: `${variables.padding.c} 0`,
    textAlign: 'center'
  }), mixins.headings.small),
  clients: mixins.makeGreyBackground({
    padding: `${variables.padding.c} 0 ${variables.padding.b} 0`
  }),
  logoWrapper: mixins.basicContainer({
    [mixins.breakpoints.m]: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around'
    }
  }),
  brand: {
    display: 'block',
    maxWidth: '250px', // ?
    width: '100%',
    [mixins.breakpoints.m]: {
      maxWidth: 'auto',
      width: '33.3%'
    }
  },
  pricing: mixins.makeOrangeBackground({
    padding: `${variables.padding.c} 0`
  }),
  pricingContainer: mixins.flexColumn(mixins.basicContainer({
    textAlign: 'center',
    width: '100%'
  })),
  pricingBox: mixins.makeRoyalBlueWobbleBox(),
  price: subtitleWhite,
  pricingSmall: merge({
    color: variables.colours.white,
    textAlign: 'center'
  }, mixins.headings.small),
  cta: mixins.flexColumn({
    padding: `${variables.padding.c}`
  }),
  or: mixins.makeOr(),
  signup: mixins.buttonPrimary(),
  contact: mixins.buttonSecondaryBorderless()
}

export default css(styles)
