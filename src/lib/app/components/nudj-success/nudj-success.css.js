import css, { merge, mixins, variables } from '../../lib/css'

const sharingIcons = {
  display: 'block',
  fill: variables.colours.royalBlue,
  height: variables.sizes.mobileActionButtonsHeight
}

const styles = {
  container: merge({}, mixins.headings.small, {
    [mixins.breakpoints.ns]: merge({}, mixins.headings.p[mixins.breakpoints.ns])
  }),
  mobileMessage: {
    color: variables.colours.royalBlue,
    display: 'block',
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  message: {
    color: variables.colours.royalBlue,
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'block'
    }
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    padding: `${variables.padding.e} 0 0 0`,
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  actionLink: {
    padding: variables.padding.e,
    textDecoration: 'none'
  },
  actionTitle: {
    color: variables.colours.royalBlue,
    display: 'block',
    padding: `${variables.padding.e} 0 0 0`
  },
  link: {
    display: 'none',
    padding: `${variables.padding.e} 0`,
    [mixins.breakpoints.ns]: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    }
  },
  linkContainer: merge({
    borderColor: variables.colours.royalBlueTint4,
    borderRadius: variables.sizes.formsInputBorderRadius,
    borderStyle: 'solid',
    borderWidth: variables.sizes.formsInputBorderWidth,
    color: variables.colours.royalBlue,
    display: 'block',
    flexGrow: '1',
    overflow: 'hidden',
    padding: variables.padding.e,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    width: 'auto',
    whiteSpace: 'nowrap'
  }, mixins.headings.p),
  copyLink: mixins.buttonSecondary({
    display: 'block',
    marginLeft: variables.padding.d
  }),
  copyLinkIcon: {
    cursor: 'pointer',
    display: 'block',
    height: variables.sizes.mobileActionButtonsHeight,
    stroke: variables.colours.royalBlue
  },
  socialAction: sharingIcons,
  waLink: sharingIcons,
  fbmLink: sharingIcons,
  liLink: sharingIcons,
  gLink: sharingIcons,
  linkText: {}
}

let colouredStyles = {}

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

  colouredStyles = {
    linkContainer: {
      borderColor: variables.colours[textColour] || styles.linkContainer.borderColor,
      color: variables.colours[textColour] || styles.linkContainer.color
    },
    mobileMessage: {
      color: variables.colours[textColour] || styles.mobileMessage.color
    },
    message: {
      color: variables.colours[textColour] || styles.message.color
    },
    actionTitle: {
      color: variables.colours[textColour] || styles.actionTitle.color
    },
    waLink: {
      fill: variables.colours[textColour] || styles.waLink.fill
    },
    fbmLink: {
      fill: variables.colours[textColour] || styles.fbmLink.fill
    },
    copyLinkIcon: {
      stroke: variables.colours[textColour] || styles.copyLinkIcon.stroke
    },
    copyLink: {
      backgroundColor: variables.colours[textHighlightColour] || styles.copyLink.backgroundColor,
      borderColor: variables.colours[textHighlightColour] || styles.copyLink.borderColor,
      color: variables.colours[buttonTextColour] || variables.colours[textColour] || styles.copyLink.color
    }
  }
}

const getStyle = () => {
  const compiledStyles = merge({}, styles, colouredStyles)
  return css(compiledStyles)()
}

export { getStyle, setStyles }

export default getStyle
