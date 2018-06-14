const { StyleSheet, utilities, colors, typography } = require('@nudj/components/lib/css')

const breakpoint = '38rem'

const styleSheet = StyleSheet.create({
  root: {
    zIndex: 2000,
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 2rem)',
    maxWidth: '67.25rem',
    bottom: '1rem',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
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
      marginRight: '1rem',
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
    marginTop: '1rem',
    marginRight: '1rem',
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
