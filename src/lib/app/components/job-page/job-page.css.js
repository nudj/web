import css, { merge, mixins, variables } from '../../lib/css'

const buttonMargins = {
  margin: `0 0 ${variables.padding.e}`,
  [mixins.breakpoints.l]: {
    margin: `0 0 ${variables.padding.d} 0`
  }
}

const jobHeaderTitleHighlight = {
  color: variables.colours.midRed,
  [mixins.breakpoints.l]: {
    whiteSpace: 'nowrap'
  }
}

const styles = {
  navContainer: {
    backgroundColor: 'blue'
  },
  navContainerDark: {
    backgroundColor: 'blue'
  },
  job: {
    backgroundColor: variables.colours.white,
    padding: `${variables.padding.b} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.a} 0 ${variables.padding.b} 0`
    }
  },
  jobHeader: mixins.basicContainer(),
  jobHeaderTitle: merge({}, mixins.typography.titleCharcoal, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobHeaderTitleHighlight: merge({}, jobHeaderTitleHighlight, mixins.makeOrangeSubtitleUnderline()),
  jobHeaderTitleHighlightLink: merge({}, jobHeaderTitleHighlight, {
    textDecoration: 'none'
  }, mixins.makeOrangeSubtitleUnderline()),
  jobHeaderSubtitle: merge({}, mixins.headings.h4, {
    color: variables.colours.midRed,
    margin: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobHeaderDescription: merge({}, mixins.typography.copy, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
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
    margin: `0 0 ${variables.padding.c}`,
    [mixins.breakpoints.l]: {
      margin: '0',
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
      color: variables.colours[highlightColour] || styles.jobHeaderTitleHighlight.color
    },
    jobHeaderTitleHighlightLink: {
      color: variables.colours[highlightColour] || styles.jobHeaderTitleHighlightLink.color
    },
    jobHeaderSubtitle: {
      color: variables.colours[highlightColour] || styles.jobHeaderSubtitle.color
    }
  }

  merge(styles, colouredStyles)
}

export {getStyle, setStyles}
