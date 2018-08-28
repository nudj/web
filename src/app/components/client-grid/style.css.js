const { StyleSheet } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    listStyleType: 'none',
    paddingLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    maxWidth: '10rem',
    width: '50%',
    display: 'none',
    '@media(min-width: 32rem)': {
      display: 'block',
      maxWidth: '100%',
      width: '33.3333%'
    },
    '@media(min-width: 50rem)': {
      width: '25%'
    }
  },
  itemImportant: {
    display: 'block'
  },
  logo: {
    width: '100%'
  }
})

module.exports = styleSheet
