const { merge } = require('@nudj/library')
const { StyleSheet, sizes } = require('@nudj/components/styles')
const { mixins, variables } = require('../../lib/css')

const breakpoint = '39.375rem'

const jobHeaderTitleHighlight = {
  color: variables.colors.midRed,
  [mixins.breakpoints.l]: {
    whiteSpace: 'nowrap'
  }
}

const styleSheet = StyleSheet.create({
  navContainer: {
    backgroundColor: 'blue'
  },
  navContainerDark: {
    backgroundColor: 'blue'
  },
  job: {
    backgroundColor: variables.colors.white,
    padding: `${variables.padding.b} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.a} 0 ${variables.padding.b} 0`
    }
  },
  jobContainer: mixins.basicContainer(),
  jobHeaderTitle: merge({}, mixins.typography.titleCharcoal, {
    margin: `0 auto ${variables.padding.b} auto`,
    paddingBottom: '0',
    maxWidth: '46rem',
    textAlign: 'left'
  }),
  expandedJobHeaderTitle: merge({}, mixins.typography.titleCharcoal, {
    margin: `0 0 ${variables.padding.c} 0`,
    textAlign: 'left'
  }),
  jobHeaderTitleHighlight: jobHeaderTitleHighlight,
  jobHeaderTitleHighlightLink: merge(jobHeaderTitleHighlight, {
    textDecoration: 'none'
  }),
  jobDescriptionSubtitle: merge({}, mixins.headings.h4, {
    flex: '1',
    color: variables.colors.midRed,
    padding: `0 ${variables.padding.d} ${variables.padding.d} 0`,
    textAlign: 'left',
    [mixins.breakpoints.ns]: {
      textAlign: 'left'
    }
  }),
  jobDescptionContainer: {
    margin: `none`
  },
  jobDescriptionText: merge(mixins.typography.copy, {
    flex: '1',
    textAlign: 'left',
    whiteSpace: 'pre-line'
  }),
  actions: mixins.flexColumn({
    padding: `${variables.padding.d} ${variables.padding.d}`,
    [mixins.breakpoints.ns]: {
      padding: `${variables.padding.d} ${variables.padding.c}`
    }
  }),
  or: mixins.makeOrDark(),
  action: {
    ...mixins.flexColumn(),
    width: '100%'
  },
  actionCopy: merge({}, mixins.typography.copy, {
    marginTop: variables.padding.e,
    marginBottom: 0,
    [mixins.breakpoints.l]: {
      marginTop: variables.padding.d,
      marginBottom: 0
    },
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  applied: mixins.buttonPrimaryDisabled(),
  apply: mixins.buttonPrimary(),
  nudj: mixins.buttonPrimary(),
  related: mixins.makeGreyBackground({
    paddingTop: variables.padding.b,
    paddingBottom: variables.padding.b
  }),
  relatedTitle: merge({}, mixins.typography.title, mixins.makeOrangeSubtitleUnderlineOnGrey()),
  list: merge(mixins.basicContainer(), mixins.deList(), {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'left',
    alignItems: 'stretch',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.e,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.e,
    '@media(min-width: 55rem)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: variables.padding.d,
      paddingRight: variables.padding.d,
      paddingBottom: variables.padding.d,
      paddingLeft: variables.padding.d
    }
  }),
  relatedJob: merge({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: variables.colors.white,
    boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    margin: variables.padding.f,
    flexBasis: '100%',
    ':first-child:last-child': {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '@media(min-width: 55rem)': {
      flexBasis: `calc(50% - ${variables.padding.d})`
    }
  }),
  jobTitle: mixins.typography.h3,
  jobDescriptionBox: merge(mixins.flexColumn(), {
    display: 'flex',
    overflow: 'hidden',
    height: 'auto'
  }),
  collapseBoxLineLeft: mixins.collapseBoxTopLine('cta-separator-line-1.svg'),
  collapseBoxLineRight: mixins.collapseBoxTopLine('cta-separator-line-2.svg'),
  jobDescriptionSection: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: variables.padding.b,
    display: 'block',
    ':last-of-type': {
      paddingBottom: variables.padding.b
    },
    [mixins.breakpoints.ns]: {
      paddingBottom: variables.padding.b,
      display: 'flex'
    }
  },
  hidden: {
    display: 'none'
  },
  toggleButton: merge(mixins.typography.copy, mixins.headings.h6, {
    cursor: 'pointer',
    padding: variables.padding.e
  }),
  toggleDescriptionButtonContainer: {
    display: 'none',
    '^.js': {
      display: 'flex',
      paddingBottom: variables.padding.c,
      width: '100%',
      alignItems: 'flex-end'
    }
  },
  jobDescriptionContainer: {
    [`@media(min-width: ${breakpoint})`]: {
      maxWidth: '46rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  jobDescriptionFallback: merge({}, mixins.typography.copy, {
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    margin: `0 0 ${variables.padding.b} 0`,
    textAlign: 'left',
    whiteSpace: 'pre-line',
    [mixins.breakpoints.ns]: {
      textAlign: 'left'
    }
  }),
  jobDescriptionSubtitleFallback: merge({}, mixins.headings.h4, {
    color: variables.colors.midRed,
    margin: `0 0 ${variables.padding.d} 0`,
    textAlign: 'left'
  }),
  bodyLinks: merge({}, mixins.typography.copy, mixins.headings.pBold, mixins.textHighlight(), {
    textDecoration: 'none'
  }),
  strong: mixins.headings.pBold,
  blockLink: {
    display: 'block',
    textDecoration: 'none'
  },
  jobDeadContainer: merge(mixins.flexColumn({
    paddingLeft: variables.padding.d,
    paddingRight: variables.padding.d
  })),
  jobDeadNotice: merge(mixins.makeGreyWobbleBox({
    marginTop: variables.padding.b,
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    maxWidth: '42rem',
    width: '100%'
  })),
  jobDeadTitle: merge({
    color: variables.colors.royalBlue,
    paddingTop: variables.padding.d,
    paddingBottom: variables.padding.d
  }, mixins.headings.h4),
  jobDeadCopy: merge({}, mixins.typography.copy, {
    paddingBottom: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingLeft: variables.padding.d,
    margin: '0',
    textAlign: 'center'
  }),
  relatedCompany: mixins.textHighlight(),
  button: {
    paddingTop: sizes.regular,
    paddingBottom: sizes.regular,
    minWidth: sizes.largeIx
  }
})

module.exports = styleSheet
