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
  padding: variables.padding.d,
  position: 'fixed',
  top: '0',
  width: '100%', // ?
  zIndex: variables.zIndicies.mobileMenuConstant,   // ?
  [mixins.breakpoints.l]: {
    display: 'none'
  }
}

const navBarConstant = mixins.makeTransition({
  properties: ['transform'],
  details: variables.transitions.bouncey
}, navBarConstantBase)

const innerBurgerColour = {
  color: variables.colours.white
}

const innerBurgerLight = {
  '.hamburger-inner': innerBurgerColour,
  '.hamburger-inner:after': innerBurgerColour,
  '.hamburger-inner:before': innerBurgerColour
}

const baseBurger = {
  '.hamburger': {
    outline: 'none'
  }
}

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
    transform: 'translate3d(0, -100%, 0)'
  }, navBarConstant),
  navBarConstantIsActive: merge({
    pointerEvents: 'all',
    transform: 'translate3d(0, 0, 0)'
  }, navBarConstant),
  link: merge({}, mixins.deLink({
    color: variables.colours.royalBlue,
    display: 'none',
    padding: variables.padding.d,
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  }), mixins.headings.h6),
  request: mixins.buttonPrimary({
    display: 'none',
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  }),
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
  hamburger: baseBurger,
  hamburgerIsActive: baseBurger,
  hamburgerLight: merge({}, baseBurger, innerBurgerLight),
  hamburgerIsActiveLight: merge({}, baseBurger, innerBurgerLight)
}

export default css(styles)
