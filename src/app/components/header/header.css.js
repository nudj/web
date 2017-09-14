const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const mobileMenuBase = mixins.flexColumn({
  alignItems: 'stretch',
  backgroundColor: variables.colours.navy,
  boxShadow: `1000px 0 0 1000px ${variables.colours.navy}`,
  height: '100%',
  left: '0',
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: variables.zIndicies.mobileMenu
})

const mobileMenu = mixins.makeTransition({
  properties: ['transform'],
  details: variables.transitions.bouncy
}, mobileMenuBase)

const navBarConstantBase = {
  alignItems: 'center',
  backgroundColor: variables.colours.navy,
  boxShadow: `0 -1000px 0 1000px ${variables.colours.navy}`,
  display: 'flex',
  justifyContent: 'space-between',
  left: '0',
  padding: `${variables.padding.e} calc(${variables.padding.d} + ${variables.padding.e})`,
  position: 'fixed',
  top: '0',
  width: '100%', // ?
  zIndex: variables.zIndicies.mobileMenuConstant,
  '::after': mixins.makePsuedoElement({
    backgroundImage: mixins.linkImage('bg-wiggle-top-navy.svg'),
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    bottom: '-3px',
    height: variables.padding.e,
    left: '-10%',
    position: 'absolute',
    width: '120%'
  }),
  [mixins.breakpoints.l]: {
    display: 'none'
  }
}

const link = merge({}, mixins.deLink({
  color: variables.colours.charcoal,
  display: 'none',
  padding: `calc(${variables.padding.e} * 1.5) ${variables.padding.d}`,
  [mixins.breakpoints.l]: {
    display: 'block'
  }
}), mixins.headings.h6)

const request = mixins.buttonPrimary({
  display: 'none',
  marginLeft: variables.padding.d,
  minWidth: 'inherit',
  [mixins.breakpoints.l]: {
    display: 'block'
  }
})

const navBarConstant = mixins.makeTransition({
  properties: ['transform'],
  details: variables.transitions.bouncy
}, navBarConstantBase)

const burgerLineOffset = 2

const innerBurger = {
  borderRadius: variables.sizes.magicBorderRadius,
  height: `calc(${variables.padding.d} * 0.15)`,
  transform: `translate3d(0, ${burgerLineOffset}px, 0)`,
  width: `calc(${variables.padding.e} * 2.5)`
}

const innerBurgerAfter = merge({}, innerBurger, {
  transform: `translate3d(0, -${burgerLineOffset * 2}px, 0)`
})

const innerBurgerBefore = merge({}, innerBurger, {
  transform: `translate3d(0, -${burgerLineOffset}px, 0)`
})

const innerBurgerMiddle = merge({}, innerBurger, {
  transform: `translate3d(0, ${burgerLineOffset}px, 0)`
})

const innerBurgerColour = {
  backgroundColor: variables.colours.white
}

const innerBurgerAltColour = {
  backgroundColor: variables.colours.navy
}

// Commenting this out for now while we wait for a fix to Aphrodite
// https://github.com/Khan/aphrodite/pull/240
const navIntroAnimations = {
  // animationDelay: variables.transitions.mediumEasy.length,
  // animationDuration: variables.transitions.mediumEasy.length,
  // animationFillMode: 'both',
  // animationIterationCount: '1',
  // animationName: mixins.animations.appearTop,
  // animationTimingFunction: variables.transitions.mediumEasy.easing
}

const styles = {
  navContainer: {
    backgroundColor: 'transparent'
  },
  nav: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: variables.padding.d,
    position: 'relative',
    [mixins.breakpoints.l]: {
      margin: '0 auto',
      maxWidth: variables.sizes.contentMaxWidth
    }
  },
  navLeft: merge({
    flexShrink: '0'
  }, navIntroAnimations),
  navRight: merge({
    [mixins.breakpoints.l]: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, navIntroAnimations),
  homeButton: {
    display: 'block',
    width: `calc(${variables.padding.c} + ${variables.padding.d})`
  },
  homeButtonImage: {
    display: 'block',
    height: variables.padding.b
  },
  brandSmall: {
    display: 'block',
    height: variables.padding.c
  },
  mobileMenu: merge({
    pointerEvents: 'none',
    transform: 'translate3d(100%, 0, 0)'
  }, mobileMenu),
  mobileMenuIsActive: merge({
    pointerEvents: 'all',
    transform: 'translate3d(0, 0, 0)'
  }, mobileMenu),
  navBarConstant: merge({
    pointerEvents: 'all',
    transform: `translate3d(0, calc(-100% - ${variables.padding.e}), 0)`
  }, navBarConstant),
  navBarConstantIsActive: merge({
    pointerEvents: 'all',
    transform: 'translate3d(0, 0, 0)'
  }, navBarConstant),
  link: link,
  linkLight: merge({}, link, {
    color: variables.colours.white
  }),
  request: request,
  linkMobile: merge({}, mixins.deLink({
    color: variables.colours.white,
    display: 'block',
    padding: `${variables.padding.e} ${variables.padding.c}`,
    textAlign: 'right'
  }), mixins.headings.h2),
  requestMobile: mixins.buttonPrimary({
    alignSelf: 'flex-end',
    display: 'inline-block',
    margin: `calc(${variables.padding.d} + ${variables.padding.e}) calc(${variables.padding.d} + ${variables.padding.e}) 0 calc(${variables.padding.d} + ${variables.padding.e})`,
    textAlign: 'center'
  }),
  hamburgerHolder: {
    [mixins.breakpoints.l]: {
      display: 'none'
    }
  },
  burger: mixins.deButton({
    outline: 'none',
    padding: '0',
    ':hover': {
      opacity: '1'
    }
  }),
  burgerBox: {
    height: variables.padding.d,
    width: `calc(${variables.padding.e} * 2.5)`
  },
  hamburger: merge({
    '::after': innerBurgerAfter,
    '::before': innerBurgerBefore
  }, innerBurgerMiddle),
  hamburgerIsActive: merge({
    '::after': innerBurger,
    '::before': innerBurger
  }, innerBurgerMiddle),
  burgerPosition: merge({
    '::after': innerBurgerAfter,
    '::before': innerBurgerBefore
  }, innerBurgerMiddle),
  burgerColourDefault: merge({}, {
    '::after': innerBurgerColour,
    '::before': innerBurgerColour
  }, innerBurgerColour),
  burgerColoured: merge({}, {
    '::after': merge({}, innerBurgerAltColour),
    '::before': merge({}, innerBurgerAltColour)
  }, merge({}, innerBurgerAltColour))
}

let colouredStyles = {}

const setStyles = (backgroundColour, textColour, textHighlightColour, buttonTextColour) => {
  if (backgroundColour === 'undefined') {
    backgroundColour = undefined
  }

  if (textColour === 'undefined') {
    textColour = undefined
  }

  if (textHighlightColour === 'undefined') {
    textHighlightColour = undefined
  }

  if (buttonTextColour === 'undefined') {
    buttonTextColour = undefined
  }

  const burgerColour = {
    backgroundColor: variables.colours[textColour] || styles.burgerColoured.backgroundColor
  }

  colouredStyles = {
    navContainer: {
      backgroundColor: variables.colours[backgroundColour] || styles.navContainer.backgroundColor
    },
    request: {
      backgroundColor: variables.colours[textHighlightColour] || styles.request.backgroundColor,
      borderColor: variables.colours[textHighlightColour] || styles.request.borderColor,
      color: variables.colours[buttonTextColour] || variables.colours[textColour] || styles.request.color
    },
    link: {
      color: variables.colours[textColour] || styles.link.color
    },
    burgerColoured: merge({}, burgerColour, {
      '::after': burgerColour,
      '::before': burgerColour
    })
  }
}

const getStyle = () => {
  const compiledStyles = merge({}, styles, colouredStyles)
  return css(compiledStyles)()
}

module.exports = getStyle
module.exports.getStyle = getStyle
module.exports.setStyles = setStyles
