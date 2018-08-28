const { StyleSheet, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  quote: {
    ...typography.type.largeI,
    fontWeight: typography.fontWeight.light,
    color: 'currentColor',
    textAlign: 'center',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    ':before': {
      content: '"“"'
    },
    ':after': {
      content: '"”"'
    },
    '@media(min-width: 42.5rem)': {
      ...typography.type.largeIi,
      fontWeight: typography.fontWeight.light
    }
  }
})

module.exports = styleSheet
