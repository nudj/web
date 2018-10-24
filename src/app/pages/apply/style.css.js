const { css, merge } = require('@nudj/framework/css')
const { StyleSheet, sizes } = require('@nudj/components/styles')
const { mixins, variables } = require('../../lib/css')

const legacyStyles = {
  body: mixins.flexColumn(),
  content: {
    width: '100%'
  },
  formHeader: mixins.basicContainerMedium({
    paddingBottom: variables.padding.c,
    paddingTop: variables.padding.c,
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.b,
      paddingBottom: variables.padding.b
    }
  }),
  title: mixins.typography.titleCharcoal,
  subtitle: merge(mixins.typography.copy, {
    [mixins.breakpoints.ns]: {
      margin: `0 0 ${variables.padding.d} 0`
    }
  }),
  formSection: merge(mixins.forms.fieldSet, {
    paddingBottom: variables.padding.c,
    paddingTop: variables.padding.c,
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.b,
      paddingBottom: variables.padding.b
    }
  }),
  form: merge(mixins.forms.fieldWrapContainer, {
    display: 'block'
  }),
  buttonContainer: {
    textAlign: 'center'
  }
}

const styleSheet = StyleSheet.create({
  inputField: {
    width: '100%',
    ':nth-child(n) + *': {
      marginTop: sizes.regular
    }
  },
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
  subtitle: merge(mixins.typography.copy, {
    [mixins.breakpoints.ns]: {
      margin: `0 0 ${variables.padding.d} 0`
    }
  }),
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
})

module.exports = {
  getLegacyStyles: css(legacyStyles),
  styleSheet
}
