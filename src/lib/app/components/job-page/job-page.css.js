import css, { merge, mixins, variables } from '../../lib/css'

const infoContainer = {
  padding: `${variables.padding.d} 0`,
  position: 'relative',
  textAlign: 'center',
  width: '100%',
  [mixins.breakpoints.ns]: {
    width: '50%'
  }
}

const infoTitle = merge({
  color: variables.colours.charcoal,
  margin: '0',
  padding: '0'
}, mixins.headings.h4Light)

const infoCopy = merge({
  color: variables.colours.charcoal,
  margin: '0',
  padding: `0 0 ${variables.padding.e} 0`,
  textAlign: 'center'
}, mixins.headings.p)

const titles = merge({
  color: variables.colours.royalBlue,
  margin: '0',
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.h3)

const copy = merge({
  color: variables.colours.charcoal,
  margin: '0',
  padding: `0 0 ${variables.padding.d} 0`
}, mixins.headings.p)

const infoRows = {
  display: 'flex',
  padding: `0 0 ${variables.padding.c} 0`,
  flexWrap: 'wrap',
  [mixins.breakpoints.ns]: {
    flexWrap: 'nowrap'
  }
}

const infoCells = {
  padding: `0 0 ${variables.padding.c} 0`,
  width: '100%',
  [mixins.breakpoints.ns]: {
    width: '50%'
  }
}

const infoCellEven = merge({}, infoCells, {
  [mixins.breakpoints.ns]: {
    paddingLeft: variables.padding.d
  }
})

const infoCellOdd = merge({}, infoCells, {
  [mixins.breakpoints.ns]: {
    paddingRight: variables.padding.d
  }
})

const styles = {
  body: mixins.flexColumn({
    textAlign: 'center',
    [mixins.breakpoints.ns]: {
      textAlign: 'inherit' // 'left' ?
    }
  }),
  content: {
    width: '100%'
  },
  red: {
    color: variables.colours.midRed
  },
  break: {
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'inline-block'
    }
  },
  job: mixins.basicContainer({
    paddingTop: variables.padding.c
  }),
  info: merge({},
    mixins.afterUnderlineSquiggle('grey-wiggle-line.svg'),
    mixins.beforeUnderlineSquiggle('grey-wiggle-line.svg'),
    {
      [mixins.breakpoints.ns]: {
        display: 'flex'
      }
    }
  ),
  title: merge({}, mixins.typography.title, {
    margin: '0',
    padding: `0 0 ${variables.padding.b} 0`
  }),
  brandName: {
    color: variables.colours.midRed
  },
  infoContainer: infoContainer,
  infoContainerWithSeparator: merge({}, mixins.afterUnderlineSquiggle('grey-wiggle-line.svg'), {
    '::after': {
      left: '25%',
      width: '50%',
      [mixins.breakpoints.ns]: {
        backgroundImage: mixins.linkImage('grey-vertical-separator.svg'),
        bottom: 'auto',
        left: 'auto',
        height: '100%',
        right: variables.padding.e,
        position: 'absolute',
        top: variables.padding.d,
        width: variables.padding.e
      }
    }
  }, infoContainer),
  infoTitle: infoCopy,
  infoBody: infoTitle,
  actionTitle: titles,
  awesomeTitle: titles,
  actionCopy: copy,
  awesomeCopy: copy,
  strong: merge({}, copy, mixins.headings.p.bold),
  actions: infoRows,
  description: merge({}, infoRows, {
    paddingTop: variables.padding.b
  }),
  whyOdd: infoCellOdd,
  actionOdd: infoCellOdd,
  whyEven: infoCellEven,
  actionEven: infoCellEven,
  link: merge({
    color: variables.colours.midRed
  }, copy),
  apply: mixins.buttonPrimary(),
  applied: {},
  nudj: mixins.buttonSecondary({
    border: `1px solid ${variables.colours.royalBlue}`
  }),
  related: merge(mixins.makeGreyBackground(), {
    padding: `${variables.padding.c} 0 0 0`,
    width: '100%'
  }),
  relatedTitle: merge({}, mixins.typography.title, mixins.afterUnderlineSquiggle('table-line-1.svg'), {
    margin: '0'
  }),
  list: mixins.deList(mixins.basicContainer({
    padding: `${variables.padding.b} ${variables.padding.c} ${variables.padding.c} ${variables.padding.c}`,
    [mixins.breakpoints.l]: {
      display: 'flex',
      padding: `${variables.padding.b} 0 ${variables.padding.c} 0`
    }
  })),
  relatedJob: {
    padding: `0 0 ${variables.padding.c} 0`,
    [mixins.breakpoints.l]: {
      flexBasis: '0',
      flexGrow: '1'
    }
  },
  jobTitle: titles,
  bodyLinks: merge({}, copy, mixins.headings.pBold, {
    color: variables.colours.midRed,
    textDecoration: 'none'
  }),
  breakLine: {}
}

export default css(styles)
