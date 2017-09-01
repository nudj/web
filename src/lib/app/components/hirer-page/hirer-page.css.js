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

const heroSubtitle = merge({
  color: variables.colours.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h2)

const subtitle = merge({
  color: variables.colours.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h4)

const subtitleWhite = merge({}, subtitle, {
  color: variables.colours.white
})

const subtitleUnderline = mixins.makeOrangeSubtitleUnderline()

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
  bodyTitle: merge({}, heroSubtitle, subtitleUnderline),
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
  table: mixins.basicTable.table,
  tableHeaderRow: mixins.basicTable.tableHeaderRow,
  tableHeaderFirst: mixins.basicTable.tableHeaderFirst,
  tableHeader: mixins.basicTable.tableHeader,
  tableBody: mixins.basicTable.tableBody,
  tableRow: mixins.basicTable.tableRow,
  tableLeft: mixins.basicTable.tableCellLeft,
  tableLeftFinal: mixins.basicTable.tableCellLeftFinal,
  tableItem: mixins.basicTable.tableCell,
  tableItemNudj: mixins.basicTable.tableCellBold,
  bodyNudj: merge(mixins.textHighlight({
    padding: `${variables.padding.d} 0`,
    textAlign: 'center'
  }), mixins.headings.small),
  clients: mixins.makeGreyBackground({
    padding: `${variables.padding.c} 0 ${variables.padding.b} 0`
  }),
  logoWrapper: mixins.basicContainer({
    [mixins.breakpoints.ns]: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around'
    }
  }),
  brand: {
    display: 'block',
    maxWidth: '250px', // ?
    width: '100%',
    [mixins.breakpoints.ns]: {
      maxWidth: 'none',
      padding: `0 ${variables.padding.d}`,
      width: '33.3%'
    }
  },
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
