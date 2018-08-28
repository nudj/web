const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const charcoalSvg = require('./assets/charcoal.svg')
const midRedSvg = require('./assets/mid-red.svg')
const greyLightestSvg = require('./assets/grey-lightest.svg')
const primarySvg = require('./assets/primary.svg')
const whiteSvg = require('./assets/white.svg')

const styleSheet = StyleSheet.create({
  root: {
    position: 'relative',
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    color: colors.text,
    zIndex: 1
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '74.25rem'
  },
  primary: {
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${primarySvg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      zIndex: -1
    },
    color: colors.white
  },
  greyLightest: {
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${greyLightestSvg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      zIndex: -1
    }
  },
  charcoal: {
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${charcoalSvg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      zIndex: -1
    },
    color: colors.white
  },
  midRed: {
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${midRedSvg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      zIndex: -1
    },
    color: colors.white
  },
  white: {
    ':before': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${whiteSvg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      zIndex: -1
    }
  }
})

module.exports = styleSheet
