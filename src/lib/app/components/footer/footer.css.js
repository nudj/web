import css, { merge, mixins, variables } from '../../lib/css'

function titles (xOffset = '0%') {
  const properties = merge(mixins.deLink({
    color: variables.colours.white,
    display: 'inline-block',
    margin: `0 0 ${variables.padding.d} 0`
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
  links: mixins.basicContainer(mixins.deList({
    padding: `0 0 ${variables.padding.c} 0`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'center'
    }
  })),
  link: {
    color: variables.colours.white,
    padding: `0 0 ${variables.padding.d} 0`,
    [mixins.breakpoints.l]: {
      flexBasis: '0',
      flexGrow: '1',
      padding: `0 ${variables.padding.d} ${variables.padding.d} ${variables.padding.d}`
    }
  },
  release: titles(),
  roadmap: titles('20%'),
  hiring: titles('40%'),
  terms: titles('60%'),
  label: merge({
    display: 'none',
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  }, mixins.headings.p)
}

export default css(styles)