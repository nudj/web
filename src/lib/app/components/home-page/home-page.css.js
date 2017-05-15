import css, { merge, mixins, variables } from '../../lib/css'

const title = merge({}, mixins.typography.title, {
  padding: `${variables.padding.c} 0 ${variables.padding.d} 0`
})

const subtitle = merge({
  color: variables.colours.royalBlue
}, mixins.headings.h4)

const howStep = mixins.flexColumn({
  padding: `0 ${variables.padding.d} ${variables.padding.c} ${variables.padding.d}`,
  textAlign: 'center',
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
const friendsImageRatio = 387 / 1846
const friendsImageZoomMobile = 2.5
const friendsImagePosition = 'bottom left'
const friendsImageMobile = homeImages(friendsImagePath, friendsImageRatio, friendsImageZoomMobile, friendsImagePosition)

const simpleNudjImagePath = 'home-page/fist-bump.svg'
const simpleNudjImageRatio = 167 / 2441
const simpleNudjImageZoomMobile = 2.5
const simpleNudjImageMobile = homeImages(simpleNudjImagePath, simpleNudjImageRatio, simpleNudjImageZoomMobile)

const styles = {
  body: {
    marginTop: `calc(${variables.padding.b} * -1)`
  },
  story: mixins.deList(),
  typeout: mixins.textHighlight(),
  // Not happy
  hero: {
    backgroundImage: mixins.linkImage('home-page/clouds-small.svg'),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'top center',
    padding: `${variables.padding.b} 0 ${variables.padding.c} 0`,
    [mixins.breakpoints.ns]: {
      backgroundImage: mixins.linkImage('home-page/clouds.svg'),
      paddingTop: '290px'
    }
  },
  notHappy: {
    position: 'relative',
    [mixins.breakpoints.l]: {
      backgroundImage: mixins.linkImage('home-page/unhappy-img.svg'),
      backgroundPosition: 'bottom center',
      backgroundRepeat: 'no-repeat',
      paddingBottom: '400px' // random number?
    }
  },
  notHappyContainer: mixins.basicContainer({
    padding: 0,
    textAlign: 'center'
  }),
  heroTitle: merge({}, title, {
    padding: `${variables.padding.b} ${variables.padding.d} 0 ${variables.padding.d}`,
    '::after': merge({
      marginLeft: `-${variables.padding.d}`
    }, notHappyImageMobile)
  }),
  // Unknown
  unknown: {
    '::after': unknownImageMobile,
    [mixins.breakpoints.l]: {
      backgroundImage: mixins.linkImage('home-page/hidden-img.svg'),
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      padding: `calc(${variables.padding.d} * 10) 0`
    }
  },
  unknownContainer: mixins.basicContainer(),
  unknownTitle: merge({}, title, {
    [mixins.breakpoints.l]: {
      paddingLeft: `calc(50% + ${variables.padding.d})`,
      textAlign: 'left'
    }
  }),
  // Their friends...
  friends: {
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `calc(${variables.padding.d} * 10) 0`
    },
    '::after': merge({}, friendsImageMobile, {
      marginLeft: '25vw',
      [mixins.breakpoints.l]: {
        backgroundPosition: 'left center',
        backgroundSize: 'auto',
        display: 'block',
        height: '100%',
        left: '50%',
        margin: '0',
        position: 'absolute',
        top: '0',
        width: '50%'
      }
    })
  },
  friendsContainer: mixins.basicContainer(),
  friendsTitle: merge({}, title, {
    [mixins.breakpoints.l]: {
      padding: `0 calc(50% + ${variables.padding.d}) 0 0`,
      textAlign: 'left'
    }
  }),
  // Simple nudj
  simpleNudj: {
    paddingBottom: variables.padding.b,
    '::after': simpleNudjImageMobile,
    [mixins.breakpoints.l]: {
      backgroundImage: mixins.linkImage('home-page/fist-bump.svg'),
      backgroundPosition: `center calc(100% - ${variables.padding.b})`,
      backgroundRepeat: 'no-repeat',
      padding: `0 0 calc(${variables.padding.d} * 18) 0`
    }
  },
  simpleNudjContainer: mixins.basicContainer({
    textAlign: 'center'
  }),
  how: mixins.makeGreyBackground(),
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
    },
    [mixins.breakpoints.l]: {
      // Might need to be wider?
      maxWidth: variables.breakpoints.large
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
  stepBody: mixins.typography.copy,
  basicContainer: mixins.basicContainer(),
  signup: mixins.beforeBackgroundSquiggle('bg-wiggle-mid-red.svg', {
    backgroundColor: variables.colours.midRed,
    paddingBottom: variables.padding.b
  }),
  signupContainer: mixins.basicContainerSmaller(mixins.flexColumn()),
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
  or: mixins.makeOr(),
  signupButton: mixins.buttonPrimary(),
  contact: mixins.buttonSecondaryBorderless(),
  highlight: mixins.textHighlight(),
  oppositeBreak: {
    display: 'none',
    [mixins.breakpoints.l]: {
      display: 'block'
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
