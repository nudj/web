const { StyleSheet, utilities, colors, typography, sizes } = require('@nudj/components/styles')

const breakpoint = '38rem'

const styleSheet = StyleSheet.create({
  root: {
    zIndex: 2000,
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 2rem)',
    maxWidth: '67.25rem',
    bottom: sizes.regular,
    paddingTop: sizes.largeI,
    paddingBottom: sizes.largeI,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    borderRadius: '0.4rem',
    boxShadow: utilities.boxShadow[20].wide,
    [`@media(min-width: ${breakpoint})`]: {
      display: 'flex'
    }
  },
  text: {
    display: 'block',
    [`@media(min-width: ${breakpoint})`]: {
      display: 'inline',
      marginRight: sizes.regular,
      flexGrow: 1
    }
  },
  privacyLink: {
    ...typography.type.regular,
    display: 'inline-block',
    fontWeight: typography.fontWeight.regular,
    textAlign: 'center',
    transition: 'color 150ms',
    borderWidth: 0,
    cursor: 'pointer',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.primary,
    ':hover': {
      color: colors.primaryLight
    },
    ':focus': {
      color: colors.primaryLight
    }
  },
  button: {
    flexShrink: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: sizes.regular,
    marginRight: sizes.regular,
    whiteSpace: 'nowrap',
    ':last-child': {
      marginRight: 0
    },
    [`@media(min-width: ${breakpoint})`]: {
      marginTop: 0
    }
  }
})

module.exports = styleSheet
