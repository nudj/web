import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  container: {}, // ?
  link: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: `${variables.padding.e} 0`
  },
  actions: {
    display: 'none' // Temporary
  },
  linkContainer: merge({
    borderColor: variables.colours.royalBlueTint4,
    borderRadius: variables.sizes.formsInputBorderRadius,
    borderStyle: 'solid',
    borderWidth: variables.sizes.formsInputBorderWidth,
    color: variables.colours.royalBlue,
    display: 'none',
    flexGrow: '1',
    overflow: 'hidden',
    padding: variables.padding.e,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
    [mixins.breakpoints.ns]: {
      display: 'block',
      width: 'auto'
    }
  }, mixins.headings.p),
  copyLink: mixins.buttonSecondary({
    [mixins.breakpoints.ns]: {
      marginLeft: variables.padding.d
    }
  }),
  socialAction: {},
  waLink: {},
  fbmLink: {},
  liLink: {},
  gLink: {},
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
