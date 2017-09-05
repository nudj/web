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
    textAlign: 'center',
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
    padding: variables.padding.d,
    textAlign: 'center',
    textDecoration: 'none'
  },
  actionTitle: {
    color: variables.colours.royalBlue,
    display: 'block',
    padding: `${variables.padding.e} 0 0 0`
  },
  link: {
    display: 'none',
    padding: `${variables.padding.d} 0`,
    [mixins.breakpoints.ns]: mixins.flexColumn()
  },
  linkContainer: mixins.linkContainer,
  copyLink: mixins.buttonPrimary(),
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

styles.containerMobileOnly = merge({}, styles.container, {
  [mixins.breakpoints.l]: {
    display: 'none'
  }
})

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
