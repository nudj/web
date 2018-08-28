const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const { sizes } = require('@nudj/components/lib/css')

const mobileMenuBase = mixins.flexColumn({
  alignItems: 'stretch',
  backgroundColor: variables.colors.navy,
  boxShadow: `1000px 0 0 1000px ${variables.colors.navy}`,
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
  backgroundColor: variables.colors.navy,
  boxShadow: `0 -1000px 0 1000px ${variables.colors.navy}`,
  display: 'flex',
  justifyContent: 'space-between',
  left: '0',
  padding: `${variables.padding.e} ${variables.padding.d} ${variables.padding.e} calc(${variables.padding.d} + ${variables.padding.e})`,
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
  color: variables.colors.charcoal,
  display: 'none',
  padding: `calc(${variables.padding.e} * 1.5) ${variables.padding.d}`,
  [mixins.breakpoints.l]: {
    display: 'block'
  }
}), mixins.headings.h5)

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
  backgroundColor: `${variables.colors.white}`
}

const innerBurgerAltColour = {
  backgroundColor: `${variables.colors.navy}`
}

const navIntroAnimations = {
  animationDelay: variables.transitions.mediumEasy.length,
  animationDuration: variables.transitions.mediumEasy.length,
  animationFillMode: 'both',
  animationIterationCount: '1',
  animationName: mixins.animations.appearTop,
  animationTimingFunction: variables.transitions.mediumEasy.easing
}

const activeLinkUnderline = {
  textDecoration: 'underline',
  textDecorationSkip: 'ink'
}

const linkMobileLink = merge({
  color: variables.colors.white,
  display: 'block',
  padding: `${variables.padding.e} ${variables.padding.c}`,
  textAlign: 'right'
}, mixins.headings.h2)

const linkMobileLinkActive = merge({
  textDecoration: 'underline',
  textDecorationSkip: 'initial'
}, linkMobileLink, mixins.headings.h2)

const styles = {
  navContainer: {
    backgroundColor: 'transparent'
  },
  nav: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: variables.sizes.contentMaxWidth,
    '@media(min-width: 42.5rem)': {
      paddingLeft: sizes.largeIi,
      paddingRight: sizes.largeIi
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
    transform: `translateY(-100%) translateY(-${variables.padding.e})`
  }, navBarConstant),
  navBarConstantIsActive: merge({
    pointerEvents: 'all',
    transform: 'translate3d(0, 0, 0)'
  }, navBarConstant),
  link: link,
  linkActiveHome: merge(link, activeLinkUnderline, {
    color: variables.colors.charcoal
  }),
  linkActiveHiring: merge(link, activeLinkUnderline, {
    color: variables.colors.white
  }),
  linkActiveJobs: merge(link, activeLinkUnderline, {
    color: variables.colors.charcoal
  }),
  linkActiveAbout: merge(link, activeLinkUnderline, {
    color: variables.colors.white
  }),
  linkLight: merge({}, link, {
    color: variables.colors.white
  }),
  linkMobile: merge(linkMobileLink, mixins.deLink()),
  linkMobileActiveHome: linkMobileLinkActive,
  linkMobileActiveHiring: linkMobileLinkActive,
  linkMobileActiveJobs: linkMobileLinkActive,
  linkMobileActiveAbout: linkMobileLinkActive,
  requestMobile: mixins.buttonPrimary({
    alignSelf: 'flex-end',
    display: 'inline-block',
    marginTop: `calc(${variables.padding.d} + ${variables.padding.e})`,
    marginRight: `calc(${variables.padding.d} + ${variables.padding.e})`,
    marginBottom: 0,
    marginLeft: `calc(${variables.padding.d} + ${variables.padding.e})`,
    textAlign: 'center'
  }),
  hamburgerHolder: {
    [mixins.breakpoints.l]: {
      display: 'none'
    }
  },
  burger: mixins.deButton({
    opacity: '1',
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
    backgroundColor: variables.colors[textColour] ? `${variables.colors[textColour]}` : styles.burgerColoured.backgroundColor
  }

  colouredStyles = {
    navContainer: {
      backgroundColor: variables.colors[backgroundColour] || styles.navContainer.backgroundColor
    },
    link: {
      color: variables.colors[textColour] || styles.link.color
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
