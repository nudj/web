const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const titles = mixins.underlineHoverTransition(mixins.makeOrangeSubtitleUnderlineOnDarkGrey(merge(mixins.deLink({
  color: variables.colors.white,
  display: 'inline-block',
  margin: `0 0 ${variables.padding.d} 0`
}), mixins.headings.h4, {
  [mixins.breakpoints.l]: {
    fontSize: mixins.headings.h6[mixins.breakpoints.ns].fontSize,
    margin: `0 0 ${variables.padding.f} 0`
  }
})))

const styles = {
  background: {
    backgroundColor: variables.colors.charcoal
  },
  container: mixins.basicContainer({
    padding: `${variables.padding.c} ${variables.padding.d} 0 ${variables.padding.d}`,
    [mixins.breakpoints.l]: {
      display: 'flex'
    }
  }),
  icon: mixins.flexColumn({
    [mixins.breakpoints.l]: {
      alignItems: 'flex-end'
    }
  }),
  logo: {
    display: 'block',
    height: variables.padding.b
  },
  copyright: mixins.basicContainer(merge({
    color: variables.colors.charcoalTint2,
    display: 'block',
    padding: `${variables.padding.d} ${variables.padding.d} ${variables.padding.c} ${variables.padding.d}`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      textAlign: 'left'
    }
  }, mixins.headings.small)),
  links: mixins.basicContainer(mixins.deList({
    padding: `0 0 ${variables.padding.c} 0`,
    textAlign: 'center',
    width: '100%',
    [mixins.breakpoints.ns]: {
      alignItems: 'flex-start',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'left'
    },
    [mixins.breakpoints.l]: {
      margin: '0',
      padding: '0',
      width: '50%'
    }
  })),
  link: {
    color: variables.colors.white,
    padding: `0 0 ${variables.padding.d} 0`,
    [mixins.breakpoints.ns]: {
      padding: `0 ${variables.padding.d} ${variables.padding.d} ${variables.padding.d}`,
      width: '50%'
    },
    [mixins.breakpoints.l]: {
      padding: `0 ${variables.padding.d} ${variables.padding.d} 0`,
      textAlign: 'left',
      width: '50%',
      ':nth-child(even)': {
        padding: `0 0 ${variables.padding.d} 0`
      }
    }
  },
  help: titles,
  blog: titles,
  release: titles,
  roadmap: titles,
  hiring: titles,
  terms: titles,
  label: merge({}, mixins.headings.p, {
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'block'
    },
    [mixins.breakpoints.l]: {
      fontSize: mixins.headings.p2[mixins.breakpoints.ns].fontSize
    }
  })
}

module.exports = css(styles)
