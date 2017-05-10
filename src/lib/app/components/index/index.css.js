import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  body: merge({
    fontFamily: [mixins.headings.p],
    overflowX: 'hidden',
    position: 'relative'
  }, mixins.flexColumn({
    alignItems: 'stretch'
  })),
  header: {
    position: 'relative',
    zIndex: variables.zIndicies.header
  },
  content: mixins.flexColumn({
    alignItems: 'stretch'
  }),
  footer: mixins.beforeBackgroundSquiggle('bg-wiggle-charcoal.svg')
}

export default css(styles)
