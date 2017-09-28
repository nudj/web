const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

module.exports = css({
  notification: {
    alignItems: 'center',
    backgroundColor: variables.colors.lightGrey,
    borderRadius: variables.sizing.baseBorderRadius,
    boxShadow: `${variables.sizing.genericBoxShadow} ${variables.colors.genericBoxShadow}`,
    display: 'flex',
    justifyContent: 'stretch',
    opacity: 0,
    overflow: 'hidden',
    position: 'fixed',
    top: variables.sizing.notificationTop,
    transform: `translate3d(${variables.padding.d}, -200%, 0)`,
    transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    width: `calc(100% - ${variables.padding.c})`,
    zIndex: 100,
    [mixins.breakpoints.l]: {
      left: '50%',
      transform: 'translate3d(-50%, -200%, 0)',
      width: variables.sizing.overlayDialogWidth
    }
  },
  info: {
    backgroundColor: variables.colors.pink
  },
  warn: {
    backgroundColor: variables.colors.lightYellow
  },
  error: {
    backgroundColor: variables.colors.pink
  },
  success: {
    backgroundColor: variables.colors.green
  },
  message: merge(mixins.headings.p2, {
    flex: 1,
    padding: `${variables.padding.de} ${variables.padding.d}`,
    color: variables.colors.white
  }),
  close: {
    backgroundColor: variables.colors.genericLightShade,
    border: 0,
    display: 'block',
    cursor: 'pointer',
    color: variables.colors.white,
    alignSelf: 'stretch',
    padding: variables.padding.de,
    ':active': {
      outline: 'none',
      border: 'none'
    },
    ':focus': {
      outline: 'none',
      border: 'none'
    }
  },
  closeIcon: {
    display: 'block'
  },
  visible: {
    opacity: 1,
    transform: `translate3d(${variables.padding.d}, 0, 0)`,
    [mixins.breakpoints.l]: {
      transform: 'translate3d(-50%, -30%, 0)'
    }
  }
})
