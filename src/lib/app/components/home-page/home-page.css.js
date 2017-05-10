import css, { merge, mixins, variables } from '../../lib/css'

const title = merge({
  color: variables.colours.royalBlue,
  margin: '0',
  padding: `${variables.padding.c} 0 ${variables.padding.d} 0`,
  textAlign: 'center'
}, mixins.headings.h2)

const subtitle = merge({
  color: variables.colours.royalBlue,
  margin: '0'
}, mixins.headings.h4) // ??

const body = merge({
  color: variables.colours.charcoal,
  margin: '0'
}, mixins.headings.p)

const howStep = mixins.flexColumn({
  padding: `0 ${variables.padding.d} ${variables.padding.c} ${variables.padding.d}`,
  textAlign: 'center', // This needs to be in flexColumn ?
  [mixins.breakpoints.ns]: {
    width: '50%'
  },
  [mixins.breakpoints.l]: {
    width: '25%'
  }
})

function homeImages (imagePath, imageRatio, imageZoom = 1, imagePosition = 'bottom center') {
  return mixins.makePsuedoElement({
    backgroundImage: mixins.linkImage(imagePath),
    backgroundPosition: imagePosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `calc(100% * ${imageZoom})`,
    height: `calc(100vw * ${imageZoom} * ${imageRatio})`,
    marginTop: variables.padding.c,
    width: '100vw',
    [mixins.breakpoints.l]: {
      display: 'none'
    }
  })
}

const notHappyImagePath = 'home-page/unhappy-img.svg'
const notHappyImageRatio = 107 / 370
const notHappyImageZoomMobile = 2
const notHappyImageMobile = homeImages(notHappyImagePath, notHappyImageRatio, notHappyImageZoomMobile)

const unknownImagePath = 'home-page/hard-to-find-cropped.svg'
const unknownImageRatio = 150 / 248
const unknownImageMobile = homeImages(unknownImagePath, unknownImageRatio)

const friendsImagePath = 'home-page/pointing-hands.svg'
const friendsImageRatio = 312 / 807
const friendsImageZoomMobile = 1.25
const friendsImagePosition = 'bottom left'
const friendsImageMobile = homeImages(friendsImagePath, friendsImageRatio, friendsImageZoomMobile, friendsImagePosition)

const simpleNudjImagePath = 'home-page/fist-bump.svg'
const simpleNudjImageRatio = 32 / 300
const simpleNudjImageZoomMobile = 2
const simpleNudjImageMobile = homeImages(simpleNudjImagePath, simpleNudjImageRatio, simpleNudjImageZoomMobile)

const styles = {
  body: {
    marginTop: `calc(${variables.padding.b} * -1)`
  },
  story: mixins.deList(),
  hero: {
    backgroundImage: mixins.linkImage('home-page/clouds-small.svg'),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: '50% 3%',
    padding: `${variables.padding.b} 0 ${variables.padding.c} 0`, // ?
    [mixins.breakpoints.ns]: {
      backgroundPosition: '100% 5%',
      paddingTop: '290px' // ? padding
    },
    [mixins.breakpoints.l]: {
      backgroundImage: mixins.linkImage('home-page/clouds.svg'),
      backgroundSize: 'auto',
      backgroundPosition: 'top center'
    }
  },
  notHappy: {
    position: 'relative',
    [mixins.breakpoints.l]: {
      minHeight: '500px' // ?
    }
  },
  notHappyContainer: mixins.basicContainer({
    padding: 0,
    textAlign: 'center'
  }),
  unknown: {
    ':after': unknownImageMobile,
    [mixins.breakpoints.l]: {
      backgroundImage: mixins.linkImage('home-page/hidden-img.svg'),
      backgroundPosition: 'center center',
      backgroundSize: '100%'
    }
  },
  unknownContainer: mixins.basicContainer({
    // paddingLeft: '50%'
  }),
  friends: {
    ':after': merge({
      marginLeft: variables.padding.d
    }, friendsImageMobile)
  },
  friendsContainer: mixins.basicContainer({
    // paddingRight: '50%'
  }),
  simpleNudj: {
    ':after': simpleNudjImageMobile
  },
  simpleNudjContainer: mixins.basicContainer({
    textAlign: 'center'
  }),
  heroTitle: merge({}, title, {
    padding: `${variables.padding.b} ${variables.padding.d} 0 ${variables.padding.d}`,
    ':after': merge({
      marginLeft: `-${variables.padding.d}`
    }, notHappyImageMobile)
  }),
  unknownTitle: title,
  friendsTitle: title,
  how: mixins.flexColumn(mixins.beforeBackgroundSquiggle('bg-wiggle-light-grey.svg', {
    backgroundColor: variables.colours.lighterGrey
  })), // align-items
  nudjTitle: title,
  bodyTitle: merge({
    padding: `${variables.padding.c} 0`
  }, subtitle),
  howUnderline: {},
  steps: mixins.deList({
    padding: `0 0 ${variables.padding.c} 0`,
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
  stepTitle: merge({
    padding: `${variables.padding.d} 0 ${variables.padding.f} 0`
  }, subtitle),
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
  signupSubtitle: merge({}, mixins.headings.p2, {
    color: variables.colours.white,
    margin: '0',
    padding: `0 0 ${variables.padding.c} 0`,
    textAlign: 'center'
  }),
  cta: mixins.flexColumn({
    padding: `0 ${variables.padding.c}`
  }),
  or: merge({
    backgroundImage: mixins.linkImage('cta-separator-line.svg'),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: variables.colours.white,
    display: 'block',
    padding: (variables.padding.c + ' ' + variables.padding.a),
    textAlign: 'center'
  }, mixins.headings.h4Light),
  signupButton: mixins.buttonPrimary({
    minWidth: '280px'
  }),
  contact: mixins.buttonSecondary({
    minWidth: '280px'
  }),
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
