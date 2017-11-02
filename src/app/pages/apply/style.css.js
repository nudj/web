const { css } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  body: mixins.flexColumn(),
  content: {
    width: '100%'
  },
  formHeader: mixins.basicContainer({
    paddingBottom: variables.padding.c,
    paddingTop: variables.padding.a
  }),
  formHeaderSuccess: mixins.basicContainerMedium({
    paddingBottom: variables.padding.c,
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.a
    },
    paddingTop: variables.padding.c,
    '::after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage('thumbs-up.svg'),
      backgroundPosition: 'bottom right',
      backgroundRepeat: 'no-repeat',
      bottom: variables.padding.c,
      height: '100%',
      pointerEvents: 'none',
      position: 'absolute',
      right: '45%',
      width: '55vw'
    })
  }),
  title: mixins.typography.title,
  [mixins.breakpoints.ns]: {
    subtitle: mixins.typography.subtitle
  },
  subtitle: mixins.typography.p,
  fieldSet: mixins.forms.fieldSet,
  fieldWrapContainer: mixins.forms.fieldWrapContainer,
  fieldWrap: mixins.forms.fieldWrap,
  fieldWrapShortOdd: mixins.forms.fieldWrapShortOdd,
  fieldWrapShortEven: mixins.forms.fieldWrapShortEven,
  fieldLabel: mixins.forms.label,
  fieldInput: mixins.forms.inputText,
  invalidInput: mixins.forms.inputText,
  fieldButtons: mixins.forms.buttonsHolder,
  fieldSubmit: mixins.buttonPrimary(),
  link: mixins.typography.copyLink,
  fingersCrossed: {
    left: '25%',
    margin: '0 auto',
    position: 'relative',
    [mixins.breakpoints.l]: {
      left: '50%'
    }
  },
  button: mixins.buttonPrimary({
    textAlign: 'center'
  }),
  // This is in here for spacing/guidance - formHeader::after shows the image
  thumbsUp: {
    margin: '0 auto',
    opacity: '0',
    padding: `0 0 ${variables.padding.c} 0`,
    position: 'relative'
  },
  companyName: mixins.textHighlight()
}

module.exports = css(styles)
