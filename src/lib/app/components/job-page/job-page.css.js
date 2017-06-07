import css, { merge, mixins, variables } from '../../lib/css'

const buttonMargins = {
  margin: `0 0 ${variables.padding.e}`,
  [mixins.breakpoints.l]: {
    margin: `0 0 ${variables.padding.d} 0`
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
    backgroundColour: variables.colours.darkPink,
    padding: `${variables.padding.b} 0 ${variables.padding.a} 0`,
    position: 'relative'
  },
  jobHeader: mixins.basicContainer(),
  jobHeaderTitle: merge({}, mixins.typography.titleWhite, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  jobHeaderSubtitle: merge({}, mixins.typography.subtitle, {
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
      ':last-child': {
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
const setStyles = (backgroundColour, textColour, textHighlightColour) => {
  const colouredStyles = {
    job: {
      backgroundColor: variables.colours[backgroundColour] || styles.job.backgroundColor
    },
    jobHeaderTitle: {
      color: variables.colours[textColour] || styles.jobHeaderTitle.color
    },
    jobHeaderSubtitle: {
      color: variables.colours[textColour] || styles.jobHeaderSubtitle.color
    },
    jobHeaderDescription: {
      color: variables.colours[textColour] || styles.jobHeaderTitle.color
    },
    apply: {
      backgroundColor: variables.colours[textHighlightColour] || styles.apply.backgroundColor,
      color: variables.colours[textColour] || styles.apply.color
    },
    applied: {
      backgroundColor: variables.colours[textHighlightColour] || styles.applied.backgroundColor,
      color: variables.colours[textColour] || styles.applied.color
    },
    nudj: {
      borderColor: variables.colours[textColour] || styles.applied.borderColor,
      color: variables.colours[textColour] || styles.applied.color
    },
    actionCopy: {
      color: variables.colours[textColour] || styles.actionCopy.color
    }
  }

  merge(styles, colouredStyles)
}

export {getStyle, setStyles}
