import css, { merge, mixins, variables } from '../../lib/css'

const mobileMenuBase = mixins.flexColumn({
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
  details: variables.transitions.bouncey
}, mobileMenuBase)

const navBarConstantBase = {
  alignItems: 'center',
  backgroundColor: variables.colours.navy,
  boxShadow: `0 -1000px 0 1000px ${variables.colours.navy}`,
  display: 'flex',
  justifyContent: 'space-between',
  left: '0',
  padding: `${variables.padding.e} ${variables.padding.d}`,
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
  color: variables.colours.royalBlue,
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
  details: variables.transitions.bouncey
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

const innerBurgerColour = merge({
  backgroundColor: variables.colours.white,
  transform: `translate3d(0, ${burgerLineOffset}px, 0)`
}, innerBurger)

const innerBurgerColourAfter = merge({}, innerBurgerColour, innerBurgerAfter)

const innerBurgerColourBefore = merge({}, innerBurgerColour, innerBurgerBefore)

const styles = {
  navContainer: {
    backgroundColor: variables.colours.midRed
  },
  navContainerDark: {},
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
  navLeft: {
    flexShrink: '0'
  },
  navRight: {
    [mixins.breakpoints.l]: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  homeButton: {
    display: 'block'
  },
  homeButtonImage: {
    display: 'block',
    height: variables.padding.b
  },
  brandLightSmall: {
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
    display: 'inline-block',
    marginBottom: variables.padding.d,
    padding: variables.padding.d,
    textAlign: 'center'
  }), mixins.headings.h6),
  requestMobile: mixins.buttonPrimary({
    display: 'inline-block',
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
  }, innerBurger),
  hamburgerIsActive: merge({
    '::after': innerBurger,
    '::before': innerBurger
  }, innerBurger),
  hamburgerLight: merge({
    '::after': innerBurgerColourAfter,
    '::before': innerBurgerColourBefore
  }, innerBurgerColour),
  hamburgerIsActiveLight: merge({
    '::after': innerBurgerColour,
    '::before': innerBurgerColour
  }, innerBurgerColour)
}

export default css(styles)
