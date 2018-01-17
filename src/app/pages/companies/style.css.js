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

const subtitleUnderline = mixins.makeOrangeSubtitleUnderline()

const styles = {
  body: {
    position: 'relative' // ?
  },
  red: mixins.textHighlight(),
  hero: heroPeaceSign,
  header: {
    textAlign: 'center'
  },
  heroTitle: heroTitle,
  bodyTitle: merge({}, bodySubtitle, subtitleUnderline),
  howUnderline: {},
  bodySubtitle: merge({
    color: variables.colors.charcoal,
    padding: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center'
  }, mixins.headings.p),
  jobsSection: mixins.makeGreyBackground({
    padding: `${variables.padding.b} 0 calc(${variables.padding.b} + ${variables.padding.d})  0`
  }),
  jobs: merge(mixins.basicContainerLarge(), mixins.deList(), {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${variables.padding.c} 0 ${variables.padding.c} 0`,
    '@media(min-width: 32rem)': {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }),
  job: merge({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: variables.colors.white,
    boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    padding: variables.padding.c,
    margin: variables.padding.e,
    '@media(min-width: 32rem)': {
      maxWidth: `calc(50% - ${variables.padding.d})`
    },
    '@media(min-width: 50rem)': {
      maxWidth: `calc(25% - ${variables.padding.d})`
    }
  }),
  jobTitle: merge(mixins.headings.h4, {
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
