import css, { merge, mixins, variables } from '../../lib/css'

const baseLinkContainer = merge({
  borderRadius: variables.sizes.formsInputBorderRadius,
  borderStyle: 'solid',
  borderWidth: variables.sizes.formsInputBorderWidth,
  display: 'none',
  flexGrow: '1',
  overflow: 'hidden',
  padding: variables.padding.e,
  textAlign: 'left',
  width: '100%',
  whiteSpace: 'nowrap',
  [mixins.breakpoints.ns]: {
    display: 'block',
    width: 'auto'
  }
}, mixins.headings.p) // ? p

const baseCopyLink = mixins.buttonSecondary({
  [mixins.breakpoints.ns]: {
    marginLeft: variables.padding.d
  }
})

const styles = {
  container: {}, // ?
  link: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: `${variables.padding.d} 0`
  },
  actions: {
    display: 'none' // Temporary
  },
  linkContainer: merge({}, baseLinkContainer, {
    borderColor: variables.colours.royalBlue,
    color: variables.colours.royalBlue
  }),
  linkContainerClear: merge({}, baseLinkContainer, {
    borderColor: variables.colours.white,
    color: variables.colours.white
  }),
  copyLink: baseCopyLink,
  copyLinkClear: merge({}, baseCopyLink, {
    backgroundColor: 'transparent',
    borderColor: variables.colours.white,
    color: variables.colours.white
  }),
  socialAction: {},
  waLink: {},
  fbmLink: {},
  liLink: {},
  gLink: {},
  linkText: {}
}

export default css(styles)
