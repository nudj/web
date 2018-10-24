const { css, merge } = require('@nudj/framework/css')
const { sizes } = require('@nudj/components/styles')
const { mixins, variables } = require('../../lib/css')

const sharingIcons = {
  display: 'block',
  fill: variables.colors.royalBlue,
  height: variables.sizes.mobileActionButtonsHeight
}

const styles = {
  container: merge({}, mixins.headings.small, {
    [mixins.breakpoints.ns]: mixins.headings.p,
    width: '100%'
  }),
  mobileMessage: {
    color: variables.colors.royalBlue,
    display: 'block',
    textAlign: 'center',
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  message: {
    color: variables.colors.royalBlue,
    display: 'none',
    [mixins.breakpoints.ns]: {
      display: 'block'
    }
  },
  actions: {
    alignItems: 'start',
    display: 'flex',
    justifyContent: 'space-evenly',
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
    color: variables.colors.royalBlue,
    display: 'block',
    padding: `${variables.padding.e} 0 0 0`
  },
  link: {
    display: 'none',
    width: '100%',
    padding: `${variables.padding.d} 0`,
    [mixins.breakpoints.ns]: mixins.flexColumn()
  },
  linkContainer: {
    ...mixins.linkContainer,
    textOverflow: 'initial',
    maxWidth: '36rem'
  },
  copyLink: {
    ...mixins.buttonPrimary(),
    paddingTop: sizes.smallIi,
    paddingRight: sizes.largeI,
    paddingBottom: sizes.smallIi,
    paddingLeft: sizes.largeI,
    borderRadius: sizes.smallIi
  },
  copyLinkIcon: {
    cursor: 'pointer',
    display: 'block',
    height: variables.sizes.mobileActionButtonsHeight,
    stroke: variables.colors.royalBlue
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
      borderColor: variables.colors[textColour] || styles.linkContainer.borderColor,
      color: variables.colors[textColour] || styles.linkContainer.color
    },
    mobileMessage: {
      color: variables.colors[textColour] || styles.mobileMessage.color
    },
    message: {
      color: variables.colors[textColour] || styles.message.color
    },
    actionTitle: {
      color: variables.colors[textColour] || styles.actionTitle.color
    },
    waLink: {
      fill: variables.colors[textColour] || styles.waLink.fill
    },
    fbmLink: {
      fill: variables.colors[textColour] || styles.fbmLink.fill
    },
    copyLinkIcon: {
      stroke: variables.colors[textColour] || styles.copyLinkIcon.stroke
    },
    copyLink: {
      backgroundColor: variables.colors[textHighlightColour] || styles.copyLink.backgroundColor,
      borderColor: variables.colors[textHighlightColour] || styles.copyLink.borderColor,
      color: variables.colors[buttonTextColour] || variables.colors[textColour] || styles.copyLink.color
    }
  }
}

const getStyle = () => {
  const compiledStyles = merge({}, styles, colouredStyles)
  return css(compiledStyles)()
}

module.exports = getStyle
module.exports.getStyle = getStyle
module.exports.setStyles = setStyles
