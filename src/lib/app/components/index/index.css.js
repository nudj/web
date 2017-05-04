import css, { mixins, variables } from '../../lib/css'

const styles = {
  body: mixins.flexColumn(),
  header: {
    zIndex: variables.zIndicies.header
  },
  content: mixins.flexColumn(),
  footer: {
    position: 'relative',
    margin: '20px 0 0 0', // this needs to move into background squiggle
    '::before': mixins.beforeBackgroundSquiggle('bg-wiggle-charcoal.svg')
  }
}

export default css(styles)
