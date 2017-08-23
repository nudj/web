import css, { mixins, variables } from '../../lib/css'
// import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  token: {
    backgroundColor: variables.colours.white,
    padding: `${variables.padding.b} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.a} 0 ${variables.padding.b} 0`
    }
  }
}
const getStyle = css(styles)

export { getStyle }
