import css, { merge, mixins, variables } from '../../lib/css'

const title = merge({
  color: variables.colours.royalBlue
}, mixins.headings.h2)

const subtitle = merge({
  color: variables.colours.royalBlue
}, mixins.headings.h4) // ??

const body = merge({
  color: variables.colours.charcoal
}, mixins.headings.p)

const howStep = mixins.flexColumn({
  alignItems: 'center',
  [mixins.breakpoints.ns]: {
    width: '50%'
  },
  [mixins.breakpoints.l]: {
    width: '25%'
  }
})

const styles = {
  story: mixins.deList(),
  notHappy: {
    minHeight: '400px'
  },
  notHappyContainer: mixins.basicContainer({
    padding: 0,
    textAlign: 'center'
  }),
  unknown: {
    backgroundImage: mixins.linkImage('home-page/hard-to-find-cropped.svg'),
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    minHeight: '400px'
  },
  unknownContainer: mixins.basicContainer({
    // paddingLeft: '50%'
  }),
  friends: {
    backgroundImage: mixins.linkImage('home-page/pointing-hands.svg'),
    backgroundPosition: '110% 100%',
    backgroundRepeat: 'no-repeat',
    minHeight: '400px'
  },
  friendsContainer: mixins.basicContainer({
    // paddingRight: '50%'
  }),
  simpleNudj: {
    backgroundImage: mixins.linkImage('home-page/fist-bump.svg'),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '400px'
  },
  simpleNudjContainer: mixins.basicContainer({
    textAlign: 'center'
  }),
  heroTitle: merge({}, title, {
    backgroundImage: mixins.linkImage('home-page/unhappy-img.svg'),
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200%',
    paddingBottom: (variables.sizes.paddingWidth * 11) + 'px',
    [mixins.breakpoints.ns]: {
      backgroundSize: '100%',
      paddingBottom: (variables.sizes.paddingWidth * 15) + 'px'
    },
    [mixins.breakpoints.m]: {
      paddingBottom: (variables.sizes.paddingWidth * 16.5) + 'px'
    }
  }),
  unknownTitle: title,
  friendsTitle: title,
  how: mixins.flexColumn({
    alignItems: 'center'
  }),
  nudjTitle: title,
  bodyTitle: subtitle,
  howUnderline: {},
  steps: mixins.deList({
    [mixins.breakpoints.ns]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }),
  stepOne: howStep,
  stepTwo: howStep,
  stepThree: howStep,
  stepFour: howStep,
  stepImage: {
    display: 'block'
  },
  stepTitle: subtitle,
  stepBody: body,
  basicContainer: mixins.basicContainer(),
  signup: mixins.beforeBackgroundSquiggle('bg-wiggle-mid-red.svg', {
    backgroundColor: variables.colours.midRed,
    paddingBottom: variables.padding.b
  }),
  signupContainer: mixins.basicContainer(mixins.flexColumn({
    alignItems: 'center'
  })),
  signupTitle: merge({}, title, {
    color: variables.colours.white
  }),
  signupSubtitle: merge({}, mixins.headings.h4Light, {
    color: variables.colours.white
  }),
  cta: mixins.flexColumn(),
  or: {
    backgroundImage: mixins.linkImage('cta-separator-line.svg'),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: variables.colours.white,
    display: 'block',
    padding: (variables.padding.c + ' ' + variables.padding.a),
    textAlign: 'center'
  },
  signupButton: mixins.buttonPrimary(),
  contact: mixins.buttonSecondary(),
  highlight: {
    color: variables.colours.midRed
  },
  oppositeBreak: {
    display: 'none',
    [mixins.breakpoints.m]: {
      display: 'inline-block'
    }
  },
  standardBreak: {
    display: 'none',
    [mixins.breakpoints.l]: {
      display: 'inline-block'
    }
  }
}

export default css(styles)
