const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const heroImagePath = 'about-page/raised-hands.svg'
const heroImagePosition = 'bottom center'
const heroImageHeight = '25rem'

const heroRaisedHands = merge({
  backgroundColor: variables.colors.navy,
  padding: `${variables.padding.b} 0 ${heroImageHeight} 0`,
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

const heroSubtitle = merge({
  color: variables.colors.white,
  padding: `${variables.padding.d}`,
  textAlign: 'center'
}, mixins.headings.p)

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

const subtitleUnderline = mixins.makeOrangeSubtitleUnderlineOnGrey()

const stepContainer = mixins.basicContainer({
  padding: `${variables.padding.c} ${variables.padding.d} 0 ${variables.padding.d}`,
  textAlign: 'center',
  display: 'flex',
  [mixins.breakpoints.ns]: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'inherit'
  }
})

const step = merge({
  flexDirection: 'column-reverse',
  [mixins.breakpoints.ns]: {
    flexDirection: 'row'
  }
}, stepContainer)

const stepReverse = merge({
  flexDirection: 'column-reverse',
  [mixins.breakpoints.ns]: {
    flexDirection: 'row-reverse'
  }
}, stepContainer)

const stepImage = {
  padding: `${variables.padding.c}`,
  width: '100%',
  height: '25rem',
  [mixins.breakpoints.ns]: {
    width: `calc(50% - ${variables.padding.c})`
  }
}

const sectionContainer = mixins.basicContainer({
  padding: `${variables.padding.b} 0 ${variables.padding.b} 0`
})

const styles = {
  body: {
    position: 'relative' // ?
  },
  red: mixins.textHighlight(),
  hero: heroRaisedHands,
  heroTitle: merge(heroTitle, {
    textAlign: 'center'
  }),
  standardBreak: {
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'inline-block'
    }
  },
  heroSubtitle: heroSubtitle,
  secondaryHero: secondaryHero,
  secondaryHeroTitle: merge({
    padding: `0 0 ${variables.padding.d} 0`
  }, mixins.typography.titleWhite),
  secondaryHeroCopy: merge({}, mixins.basicContainer(), heroSubtitle),
  solution: merge(mixins.beforeBackgroundSquiggle('bg-wiggle-white.svg'), {
    padding: `${variables.padding.b} 0 calc(${variables.padding.b} + 20px) 0`
  }),
  bodyTitle: merge({}, bodySubtitle, subtitleUnderline),
  howUnderline: {},
  bodySubtitle: merge({
    color: variables.colors.charcoal,
    padding: `${variables.padding.d}`,
    textAlign: 'center'
  }, mixins.headings.p),
  steps: mixins.deList(),
  step: step,
  stepReverse: stepReverse,
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
  stepTitle: merge({
    color: variables.colors.royalBlue,
    padding: `0 0 ${variables.padding.d} 0`
  }, mixins.headings.h4),
  stepCopy: merge({
    color: variables.colors.charcoal,
    padding: `0 0 ${variables.padding.d} 0`
  }, mixins.headings.p),
  stepImage: stepImage,
  stepImageReverse: stepImage,
  team: sectionContainer,
  header: {
    textAlign: 'center'
  },
  joinUs: mixins.makeGreyBackground({
    padding: `${variables.padding.b} 0 calc(${variables.padding.b} + ${variables.padding.d})  0`
  }),
  cta: {
    padding: `0 ${variables.padding.c}`,
    marginTop: variables.padding.e,
    textAlign: 'center'
  },
  viewJobs: mixins.buttonPrimary()
}

module.exports = css(styles)
