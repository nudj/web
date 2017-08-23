import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  token: {
    backgroundColor: variables.colours.white,
    padding: `${variables.padding.b} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.a} 0 ${variables.padding.b} 0`
    }
  },
  tokenHeader: mixins.basicContainer(),
  tokenHeaderTitle: merge({}, mixins.typography.titleCharcoal, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  tokenHeaderDescription: merge({}, mixins.typography.copy, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobsList: mixins.deList(),
  jobsListItem: {}
}
const getStyle = css(styles)

export { getStyle }
