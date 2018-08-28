const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '16.25rem',
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    },
    '@media(min-width: 42.5rem)': {
      width: '82.5%'
    }
  },
  recipient: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  sender: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  body: {
    marginTop: sizes.smallIi,
    textAlign: 'left'
  }
})

module.exports = styleSheet
