import css, { merge, mixins, variables } from '../../lib/css'

const alert = {
  backgroundColor: variables.colours.midRed,
  colour: variables.colours.white
}

const styles = {
  wrapper: {
    width: '100%' // ?
  },
  primary: alert,
  info: alert,
  warning: alert,
  error: alert,
  success: alert,
  content: merge(mixins.basicContainer({
    padding: `${variables.padding.e} ${variables.padding.c}`,
    [mixins.breakpoints.ns]: {
      padding: `${variables.padding.e} 0`,
    }
  }), mixins.headings.p),
  successContent: {
    color: variables.colours.white,
    textAlign: 'center',
    width: '100%' // ?
  }
}

export default css(styles)
