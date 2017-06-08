import css, { merge, mixins, variables } from '../../lib/css'

const buttonMargins = {
  margin: `0 0 ${variables.padding.e}`,
  [mixins.breakpoints.l]: {
    margin: `0 0 ${variables.padding.d} 0`
  }
}

const jobHeaderTitleHighlight = {
  color: variables.colours.royalBlue,
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
    backgroundColor: variables.colours.darkPink,
    padding: `${variables.padding.a} 0`,
    position: 'relative'
  },
  jobHeader: mixins.basicContainer(),
  jobHeaderTitle: merge({}, mixins.typography.titleWhite, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobHeaderTitleHighlight: jobHeaderTitleHighlight,
  jobHeaderTitleHighlightLink: merge({}, jobHeaderTitleHighlight, {
    textDecoration: 'none'
  }),
  jobHeaderSubtitle: merge({}, mixins.headings.h4, {
    color: variables.colours.white,
    margin: `0 0 ${variables.padding.d} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobHeaderDescription: merge({}, mixins.typography.copy, {
    color: variables.colours.white,
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  actions: mixins.basicContainer({
    [mixins.breakpoints.l]: {
      display: 'flex'
    }
  }),
  action: {
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      margin: `0 ${variables.padding.d} 0 0`,
      textAlign: 'inherit',
      width: `calc(33.3% - ${variables.padding.d})`,
      ':last-child': {
        flexGrow: '1',
        margin: '0'
      }
    }
  },
  actionCopy: merge({}, mixins.typography.copy, {
    color: variables.colours.white,
    margin: `0 0 ${variables.padding.c}`,
    [mixins.breakpoints.l]: {
      margin: '0',
      textAlign: 'inherit'
    }
  }),
  applied: mixins.buttonPrimaryDisabled(merge({
    backgroundColour: variables.colours.royalBlue,
    color: variables.colours.white
  }, buttonMargins)),
  apply: mixins.buttonPrimary(merge({
    backgroundColour: variables.colours.royalBlue,
    color: variables.colours.white
  }, buttonMargins)),
  nudj: mixins.buttonSecondaryTransparent(buttonMargins),
  related: merge(mixins.makeGreyBackground(), {
    padding: `${variables.padding.c} 0 0 0`,
    width: '100%'
  }),
  relatedTitle: merge({}, mixins.typography.title, mixins.makeOrangeSubtitleUnderlineOnGrey()),
  list: mixins.deList(mixins.basicContainer({
    padding: variables.padding.c,
    [mixins.breakpoints.l]: {
      display: 'flex',
      padding: `${variables.padding.c} 0`
    }
  })),
  relatedJob: {
    padding: `0 0 ${variables.padding.c} 0`,
    [mixins.breakpoints.l]: {
      flexBasis: '0',
      flexGrow: '1',
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
  red: {}
}

const getStyle = css(styles)

// Override the colours -- fallback on what's there if the colour isn't defined
const setStyles = (backgroundColour, textColour, textHighlightColour, buttonTextColour) => {
  if (backgroundColour === 'undefined') {
    backgroundColour = undefined
  }

  if (textColour === 'undefined') {
    textColour = undefined
  }

  if (textHighlightColour === 'undefined') {
    textHighlightColour = undefined
  }

  if (buttonTextColour === 'undefined') {
    buttonTextColour = undefined
  }

  const colouredStyles = {
    job: {
      backgroundColor: variables.colours[backgroundColour] || styles.job.backgroundColor
    },
    jobHeaderTitle: {
      color: variables.colours[textColour] || styles.jobHeaderTitle.color
    },
    jobHeaderTitleHighlight: {
      color: variables.colours[textHighlightColour] || styles.jobHeaderTitleHighlight.color
    },
    jobHeaderTitleHighlightLink: {
      color: variables.colours[textHighlightColour] || styles.jobHeaderTitleHighlightLink.color
    },
    jobHeaderSubtitle: {
      color: variables.colours[textColour] || styles.jobHeaderSubtitle.color
    },
    jobHeaderDescription: {
      color: variables.colours[textColour] || styles.jobHeaderTitle.color
    },
    apply: {
      backgroundColor: variables.colours[textHighlightColour] || styles.apply.backgroundColor,
      borderColor: variables.colours[textHighlightColour] || styles.apply.borderColor,
      color: variables.colours[buttonTextColour] || variables.colours[textColour] || styles.apply.color
    },
    applied: {
      backgroundColor: variables.colours[textHighlightColour] || styles.applied.backgroundColor,
      borderColor: variables.colours[textHighlightColour] || styles.apply.borderColor,
      color: variables.colours[buttonTextColour] || variables.colours[textColour] || styles.applied.color
    },
    nudj: {
      borderColor: variables.colours[textColour] || styles.nudj.borderColor,
      color: variables.colours[textColour] || styles.nudj.color
    },
    actionCopy: {
      color: variables.colours[textColour] || styles.actionCopy.color
    }
  }

  merge(styles, colouredStyles)
}

export {getStyle, setStyles}
