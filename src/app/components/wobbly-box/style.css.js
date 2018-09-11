const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const charcoalSvg = 'assets/app/components/wobbly-box/charcoal.svg'
const midRedSvg = 'assets/app/components/wobbly-box/mid-red.svg'
const greyLightestSvg = 'assets/app/components/wobbly-box/grey-lightest.svg'
const primarySvg = 'assets/app/components/wobbly-box/primary.svg'
const whiteSvg = 'assets/app/components/wobbly-box/white.svg'

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
