const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const charcoalSvg = require('./assets/charcoal.svg')
const midRedSvg = require('./assets/mid-red.svg')
const greyLightestSvg = require('./assets/grey-lightest.svg')
const primarySvg = require('./assets/primary.svg')
const whiteSvg = require('./assets/white.svg')

const wiggleBackgroundBase = {
  position: 'relative',
  paddingTop: sizes.largeV,
  paddingBottom: sizes.largeV,
  '@media(min-width: 42.5rem)': {
    paddingTop: sizes.largeViii,
    paddingBottom: sizes.largeViii
  }
}

const pseudoElementBase = {
  width: '100%',
  height: '10px',
  position: 'absolute',
  top: '-9px',
  left: 0,
  backgroundSize: 'cover'
}

const styleSheet = StyleSheet.create({
  root: {
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    color: colors.text,
    '@media(min-width: 42.5rem)': {
      paddingLeft: sizes.largeIi,
      paddingRight: sizes.largeIi
    }
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '74.25rem'
  },
  primary: {
    ...wiggleBackgroundBase,
    backgroundColor: colors.primary,
    color: colors.white,
    ':before': {
      ...pseudoElementBase,
      content: '""',
      backgroundImage: `url(${primarySvg})`,
      backgroundRepeat: 'no-repeat'
    },
    ':after': {
      ...pseudoElementBase,
      top: 'auto',
      bottom: '-9px',
      content: '""',
      backgroundImage: `url(${primarySvg})`,
      backgroundRepeat: 'no-repeat',
      transform: 'scaleY(-1)'
    }
  },
  greyLightest: {
    ...wiggleBackgroundBase,
    backgroundColor: colors.greyLightest,
    ':before': {
      ...pseudoElementBase,
      content: '""',
      backgroundImage: `url(${greyLightestSvg})`,
      backgroundRepeat: 'no-repeat'
    },
    ':after': {
      ...pseudoElementBase,
      top: 'auto',
      bottom: '-9px',
      content: '""',
      backgroundImage: `url(${greyLightestSvg})`,
      backgroundRepeat: 'no-repeat',
      transform: 'scaleY(-1)'
    }
  },
  charcoal: {
    ...wiggleBackgroundBase,
    backgroundColor: colors.charcoal,
    color: colors.white,
    ':before': {
      ...pseudoElementBase,
      content: '""',
      backgroundImage: `url(${charcoalSvg})`,
      backgroundRepeat: 'no-repeat'
    },
    ':after': {
      ...pseudoElementBase,
      top: 'auto',
      bottom: '-9px',
      content: '""',
      backgroundImage: `url(${charcoalSvg})`,
      backgroundRepeat: 'no-repeat',
      transform: 'scaleY(-1)'
    }
  },
  midRed: {
    ...wiggleBackgroundBase,
    backgroundColor: colors.midRed,
    color: colors.white,
    ':before': {
      ...pseudoElementBase,
      content: '""',
      backgroundImage: `url(${midRedSvg})`,
      backgroundRepeat: 'no-repeat'
    },
    ':after': {
      ...pseudoElementBase,
      top: 'auto',
      bottom: '-9px',
      content: '""',
      backgroundImage: `url(${midRedSvg})`,
      backgroundRepeat: 'no-repeat',
      transform: 'scaleY(-1)'
    }
  },
  white: {
    ...wiggleBackgroundBase,
    backgroundColor: colors.white,
    ':before': {
      ...pseudoElementBase,
      content: '""',
      backgroundImage: `url(${whiteSvg})`,
      backgroundRepeat: 'no-repeat'
    },
    ':after': {
      ...pseudoElementBase,
      top: 'auto',
      bottom: '-9px',
      content: '""',
      backgroundImage: `url(${whiteSvg})`,
      backgroundRepeat: 'no-repeat',
      transform: 'scaleY(-1)'
    }
  }
})

module.exports = styleSheet
