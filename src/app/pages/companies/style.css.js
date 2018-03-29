const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const heroImagePath = 'peace-sign.svg'
const heroImagePosition = 'bottom center'
const heroImageHeight = '28rem'

const heroPeaceSign = merge({
  backgroundColor: variables.colors.midRed,
  paddingTop: variables.padding.b,
  paddingBottom: `calc(${heroImageHeight} * 0.85)`,
  position: 'relative',
  '::after': mixins.makePsuedoElement({
    backgroundImage: mixins.linkImage(heroImagePath),
    backgroundPosition: heroImagePosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    height: heroImageHeight,
    left: '-1.25rem',
    position: 'absolute',
    width: '100vw'
  })
})

const heroTitle = merge(mixins.basicContainerMedium(), {
  color: variables.colors.white,
  textAlign: 'center'
}, mixins.headings.h1)

const bodySubtitle = merge({
  color: variables.colors.royalBlue,
  paddingBottom: `${variables.padding.d}`,
  textAlign: 'center'
}, mixins.headings.h2)

const secondaryHero = merge({
  backgroundColor: variables.colors.navy,
  paddingTop: `${variables.padding.b}`,
  paddingBottom: `calc(${variables.padding.b} + ${variables.padding.d})`,
  position: 'relative',
  textAlign: 'center',
  '::after': mixins.makePsuedoElement()
}, mixins.beforeBackgroundSquiggle('bg-wiggle-bottom-navy.svg'))

const subtitleUnderline = mixins.makeOrangeSubtitleUnderline()
const subtitleUnderlineOrangeOnNavy = mixins.makeOrangeSubtitleUnderlineOnNavy()
const subtitleUnderlineOrangeOnGrey = mixins.makeOrangeSubtitleUnderlineOnGrey()

const styles = {
  body: {
    position: 'relative'
  },
  break: {
    display: 'block',
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  hero: heroPeaceSign,
  header: {
    textAlign: 'center'
  },
  heroTitle: heroTitle,
  bodyTitle: merge({}, bodySubtitle, subtitleUnderline),
  secondaryHero: secondaryHero,
  secondaryHeroTitle: merge({}, mixins.typography.titleWhite, subtitleUnderlineOrangeOnNavy),
  secondaryHeroCopy: merge({}, mixins.basicContainerMedium(), {
    color: variables.colors.white,
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    textAlign: 'center'
  }, mixins.headings.p),
  howUnderline: {},
  bodyCopy: merge({
    color: variables.colors.charcoal,
    paddingBottom: variables.padding.d,
    textAlign: 'center'
  }, mixins.headings.p),
  jobsSection: mixins.makeGreyBackground({
    paddingTop: `${variables.padding.b}`,
    paddingBottom: `calc(${variables.padding.b} + ${variables.padding.d})`
  }),
  jobsTitle: merge({}, bodySubtitle, subtitleUnderlineOrangeOnGrey),
  jobsContainer: {
    width: '100%'
  },
  jobs: merge(mixins.basicContainer(), mixins.deList(), {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'left',
    alignItems: 'stretch',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.e,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.e,
    '@media(min-width: 55rem)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: variables.padding.d,
      paddingRight: variables.padding.d,
      paddingBottom: variables.padding.d,
      paddingLeft: variables.padding.d
    }
  }),
  job: merge({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: variables.colors.white,
    boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    margin: variables.padding.e,
    flexBasis: '100%',
    '@media(min-width: 55rem)': {
      flexBasis: `calc(50% - ${variables.padding.d})`
    }
  }),
  jobTitle: merge(mixins.headings.h5, {
    color: variables.colors.royalBlue,
    textAlign: 'left',
    width: '100%'
  }),
  jobLink: merge(mixins.headings.h6, {
    color: variables.colors.midRed,
    textDecoration: 'none',
    textAlign: 'left',
    paddingTop: variables.padding.d,
    width: '100%'
  }),
  cta: merge(mixins.flexColumn(), mixins.basicContainerMedium(), {
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d
  }),
  signupButton: merge(mixins.buttonPrimary(), {
    marginTop: variables.padding.e
  })
}

module.exports = css(styles)
