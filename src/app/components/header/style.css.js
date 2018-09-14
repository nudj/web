const { StyleSheet, colors, sizes, typography } = require('@nudj/components/lib/css')
const { mixins, variables } = require('../../lib/css')

// Legacy
const navIntroAnimations = {
  animationDelay: variables.transitions.mediumEasy.length,
  animationDuration: variables.transitions.mediumEasy.length,
  animationFillMode: 'both',
  animationIterationCount: '1',
  animationName: mixins.animations.appearTop,
  animationTimingFunction: variables.transitions.mediumEasy.easing
}

const styleSheet = StyleSheet.create({
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: variables.sizes.contentMaxWidth,
    width: '100%',
    '@media(min-width: 60rem)': {
      paddingTop: sizes.largeIi,
      paddingRight: sizes.largeIi,
      paddingBottom: sizes.largeIi,
      paddingLeft: sizes.largeIi
    }
  },
  charcoal: {
    backgroundColor: colors.charcoal,
    color: colors.white
  },
  white: {
    backgroundColor: colors.white,
  },
  navy: {
    backgroundColor: variables.colors.navy,
    color: colors.white
  },
  midRed: {
    backgroundColor: colors.midRed,
    color: colors.white
  },
  greyLightest: {
    backgroundColor: colors.greyLightest,
    color: colors.white
  },
  navLeft: {
    ...navIntroAnimations,
    flexShrink: '0'
  },
  navRight: {
    ...navIntroAnimations,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  homeLink: {
    color: 'currentColor',
    ':visited': {
      color: 'currentColor'
    }
  },
  logo: {
    width: '2.5rem',
    '@media(min-width: 60rem)': {
      width: '3.75rem'
    }
  },
  link: {
    ...typography.type.smallIi,
    fontWeight: typography.fontWeight.bold,
    color: 'currentColor',
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    marginLeft: sizes.regular,
    textDecoration: 'none',
    '@media(min-width: 60rem)': {
      ...typography.type.regular,
      fontWeight: typography.fontWeight.bold,
      paddingTop: sizes.regular,
      paddingBottom: sizes.regular,
      marginLeft: sizes.largeIi
    }
  },
  activeLink: {
    textDecoration: 'underline',
    textDecorationSkip: 'ink'
  }
})

module.exports = styleSheet
