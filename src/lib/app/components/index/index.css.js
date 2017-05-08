import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  body: merge({
    fontFamily: [mixins.headings.p]
  }, mixins.flexColumn()),
  header: {
    zIndex: variables.zIndicies.header
  },
  content: mixins.flexColumn(),
  footer: mixins.beforeBackgroundSquiggle('bg-wiggle-charcoal.svg')
}

export default css(styles)
