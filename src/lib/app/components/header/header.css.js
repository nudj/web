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
  zIndex: variables.zIndicies.mobileMenuConstant,   // ?
  [mixins.breakpoints.l]: {
    display: 'none'
  }
}

const navBarConstant = mixins.makeTransition({
  properties: ['transform'],
  details: variables.transitions.bouncey
}, navBarConstantBase)

const innerBurger = {
  height: `calc(${variables.padding.d} * 0.1)`,
  width: variables.padding.d
}

const innerBurgerColour = merge({
  backgroundColor: variables.colours.white
}, innerBurger)

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
    marginLeft: variables.padding.d,
    minWidth: 'inherit',
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
  burger: mixins.deButton({
    outline: 'none',
    padding: '0'
  }),
  burgerBox: {
    height: variables.padding.d,
    width: variables.padding.d
  },
  hamburger: merge({
    '::after': innerBurger,
    '::before': innerBurger
  }, innerBurger),
  hamburgerIsActive: merge({
    '::after': innerBurger,
    '::before': innerBurger
  }, innerBurger),
  hamburgerLight: merge({
    '::after': innerBurgerColour,
    '::before': innerBurgerColour
  }, innerBurgerColour),
  hamburgerIsActiveLight: merge({
    '::after': innerBurgerColour,
    '::before': innerBurgerColour
  }, innerBurgerColour)
}

export default css(styles)
