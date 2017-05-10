import css, { merge, mixins, variables } from '../../lib/css'

function titles (xOffset = '0%') {
  const properties = merge(mixins.deLink({
    color: variables.colours.white
  }), mixins.headings.h4)

  return mixins.afterUnderlineSquiggle('table-line-1.svg', xOffset, properties)
}

const styles = {
  background: {
    backgroundColor: variables.colours.charcoal
  },
  container: mixins.basicContainer({
    padding: `${variables.padding.c} ${variables.padding.d}`
  }),
  icon: mixins.flexColumn(),
  logo: {
    display: 'block',
    height: variables.padding.b
  },
  copyright: merge({
    color: variables.colours.charcoalTint2,
    padding: `${variables.padding.d} 0 0 0`
  }, mixins.headings.p2),
  links: mixins.flexColumn(mixins.deList({
    padding: `0 0 ${variables.padding.c} 0`
  })),
  link: {
    color: variables.colours.white,
    padding: `0 0 ${variables.padding.d} 0`
  },
  release: titles(),
  roadmap: titles('20%'),
  hiring: titles('40%'),
  terms: titles('60%'),
  label: {
    display: 'none',
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  }
}

export default css(styles)
