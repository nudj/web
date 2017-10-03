const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const buttonMargins = {
  margin: `0 0 ${variables.padding.e}`,
  [mixins.breakpoints.l]: {
    margin: `0 0 ${variables.padding.d} 0`
  }
}

const jobHeaderTitleHighlight = {
  color: variables.colors.midRed,
  [mixins.breakpoints.l]: {
    whiteSpace: 'nowrap'
  }
}

const linkyOrangeUnderline = {
  [mixins.breakpoints.l]: merge({}, mixins.makeOrangeSubtitleUnderline(), {
    margin: '0'
  })
}

const styles = {
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
    margin: `0 0 ${variables.padding.c} 0`,
    [mixins.breakpoints.ns]: {
      margin: `0 0 ${variables.padding.c} 0`,
      textAlign: 'inherit'
    }
  }),
  jobHeaderTitleHighlight: merge({}, jobHeaderTitleHighlight, linkyOrangeUnderline),
  jobHeaderTitleHighlightLink: merge({}, jobHeaderTitleHighlight, linkyOrangeUnderline, {
    textDecoration: 'none'
  }),
  jobDescriptionSubtitle: merge({}, mixins.headings.h4, {
    flex: '1',
    color: variables.colors.midRed,
    padding: `0 ${variables.padding.de} ${variables.padding.d} 0`,
    textAlign: 'left',
    [mixins.breakpoints.ns]: {
      textAlign: 'left'
    }
  }),
  jobDescriptionText: merge(mixins.typography.copy, {
    flex: '1',
    textAlign: 'left'
  }),
  actions: mixins.flexColumn({
    padding: `0 ${variables.padding.d}`,
    [mixins.breakpoints.ns]: {
      padding: `0 ${variables.padding.c}`
    }
  }),
  or: mixins.makeOrDark(),
  action: mixins.flexColumn(),
  actionCopy: merge({}, mixins.typography.copy, {
    margin: '0',
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  applied: mixins.buttonPrimaryDisabled(buttonMargins),
  apply: mixins.buttonPrimary(buttonMargins),
  nudj: mixins.buttonPrimary(buttonMargins),
  related: merge(mixins.makeGreyBackground(), {
    padding: `${variables.padding.c} 0 0 0`,
    width: '100%'
  }),
  relatedTitle: merge({}, mixins.typography.title, mixins.makeOrangeSubtitleUnderlineOnGrey()),
  list: mixins.deList(mixins.basicContainer({
    padding: variables.padding.c,
    [mixins.breakpoints.l]: {
      display: 'flex',
      justifyContent: 'center',
      padding: `${variables.padding.c} 0`,
      width: '100%'
    }
  })),
  relatedJob: {
    padding: `0 0 ${variables.padding.c} 0`,
    [mixins.breakpoints.l]: {
      flexBasis: '0',
      flexGrow: '1',
      maxWidth: '25%',
      padding: `0 0 ${variables.padding.c} ${variables.padding.d}`,
      ':first-child': {
        paddingLeft: '0'
      }
    }
  },
  jobTitle: mixins.typography.h3,
  jobDescriptionBox: merge(mixins.flexColumn(), {
    display: 'flex',
    overflow: 'hidden',
    height: 'auto',
    transition: 'all 1000ms ease-in-out',
    '^.js': {
      opacity: '0',
      height: '0'
    }
  }),
  collapseBoxLineLeft: mixins.collapseBoxTopLine('cta-separator-line-1.svg'),
  collapseBoxLineRight: mixins.collapseBoxTopLine('cta-separator-line-2.svg'),
  jobDescriptionSection: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: variables.padding.c,
    display: 'block',
    ':last-of-type': {
      paddingBottom: variables.padding.e
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
  jobDescriptionFallback: merge({}, mixins.typography.copy, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobDescriptionSubtitleFallback: merge({}, mixins.headings.h4, {
    color: variables.colors.midRed,
    margin: `${variables.padding.b} 0 ${variables.padding.d} 0`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  bodyLinks: merge({}, mixins.typography.copy, mixins.headings.pBold, mixins.textHighlight(), {
    textDecoration: 'none'
  }),
  strong: mixins.headings.pBold,
  blockLink: {
    display: 'block',
    textDecoration: 'none'
  },
  relatedCompany: mixins.textHighlight()
}

const getStyle = css(styles)

const setStyles = (highlightColour) => {
  if (highlightColour === 'undefined') {
    highlightColour = undefined
  }

  const colouredStyles = {
    jobHeaderTitleHighlight: {
      color: variables.colors[highlightColour] || styles.jobHeaderTitleHighlight.color
    },
    jobHeaderTitleHighlightLink: {
      color: variables.colors[highlightColour] || styles.jobHeaderTitleHighlightLink.color
    },
    jobDescriptionSubtitle: {
      color: variables.colors[highlightColour] || styles.jobDescriptionSubtitle.color
    }
  }

  merge(styles, colouredStyles)
}

module.exports = getStyle
module.exports.getStyle = getStyle
module.exports.setStyles = setStyles
