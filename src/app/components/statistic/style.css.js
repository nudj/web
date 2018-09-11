const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const backgroundImage = 'assets/app/components/statistic/background.svg'

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.largeIii,
    paddingLeft: sizes.largeIii,
    paddingBottom: sizes.largeIii,
    paddingRight: sizes.largeIii,
    position: 'relative',
    color: colors.primary,
    width: '7.75rem',
    ':before': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      zIndex: -1
    },
    '@media(min-width: 32rem)': {
      width: '10rem'
    }
  }
})

module.exports = styleSheet
