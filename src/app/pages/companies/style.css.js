const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const heroImagePath = 'peace-sign.svg'
const heroImagePosition = 'bottom center'
const heroImageHeight = '27rem'

const heroPeaceSign = merge({
  backgroundColor: variables.colors.midRed,
  padding: `${variables.padding.b} 0 calc(${heroImageHeight} * 0.85) 0`,
  position: 'relative',
  '::after': mixins.makePsuedoElement({
    backgroundImage: mixins.linkImage(heroImagePath),
    backgroundPosition: heroImagePosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    height: heroImageHeight,
    left: '0',
    position: 'absolute',
    width: '100vw'
  })
})

const heroTitle = merge(mixins.basicContainerMedium(), {
  color: variables.colors.white,
  padding: `0 0 ${variables.padding.d} 0`,
  textAlign: 'center'
}, mixins.headings.h1)

const bodySubtitle = merge({
  color: variables.colors.royalBlue,
  padding: `0 0 ${variables.padding.d} 0`,
  textAlign: 'center'
}, mixins.headings.h2)

const secondaryHero = merge({
  backgroundColor: variables.colors.navy,
  padding: `${variables.padding.b} 0 calc(${variables.padding.b} + ${variables.padding.d}) 0`,
  position: 'relative',
  textAlign: 'center',
  '::after': mixins.makePsuedoElement()
}, mixins.beforeBackgroundSquiggle('bg-wiggle-bottom-navy.svg'))

const subtitleUnderline = mixins.makeOrangeSubtitleUnderline()

const subtitleUnderlineOrangeOnNavy = mixins.makeOrangeSubtitleUnderlineOnNavy()

const styles = {
  body: {
    position: 'relative'
  },
  red: mixins.textHighlight(),
  hero: heroPeaceSign,
  header: {
    textAlign: 'center'
  },
  heroTitle: heroTitle,
  bodyTitle: merge({}, bodySubtitle, subtitleUnderline),
  secondaryHero: secondaryHero,
  secondaryHeroTitle: merge({
    padding: `0 0 ${variables.padding.d} 0`
  }, mixins.typography.titleWhite, subtitleUnderlineOrangeOnNavy),
  secondaryHeroCopy: merge({}, mixins.basicContainerMedium(), {
    color: variables.colors.white,
    padding: `${variables.padding.d} ${variables.padding.d}`,
    textAlign: 'center'
  }, mixins.headings.p),
  howUnderline: {},
  bodySubtitle: merge({
    color: variables.colors.charcoal,
    padding: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center'
  }, mixins.headings.p),
  jobsSection: mixins.makeGreyBackground({
    padding: `${variables.padding.b} 0 calc(${variables.padding.b} + ${variables.padding.d})  0`
  }),
  jobsContainer: {
    width: '100%'
  },
  jobs: merge(mixins.basicContainerLarge(), mixins.deList(), {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: `${variables.padding.d} ${variables.padding.e} ${variables.padding.d} ${variables.padding.e}`,
    '@media(min-width: 35rem)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: `${variables.padding.d}`
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
    padding: `${variables.padding.d} ${variables.padding.c} ${variables.padding.d} ${variables.padding.d}`,
    margin: variables.padding.e,
    flexBasis: '100%',
    '@media(min-width: 35rem)': {
      flexBasis: `calc(50% - ${variables.padding.d})`
    },
    '@media(min-width: 70rem)': {
      flexBasis: `calc(25% - ${variables.padding.d})`
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
  })
}

module.exports = css(styles)
