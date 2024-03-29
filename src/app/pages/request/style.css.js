const { css } = require('@nudj/framework/css')
const { merge } = require('@nudj/library')
const { StyleSheet } = require('@nudj/components/lib/css')
const { mixins, variables } = require('../../lib/css')

const legacyStyles = {
  bodyContainer: {},
  body: mixins.flexColumn(),
  content: {
    width: '100%'
  },
  formHeader: mixins.basicContainerSmaller({
    paddingBottom: variables.padding.c,
    paddingTop: variables.padding.b
  }),
  title: mixins.typography.title,
  subtitle: mixins.typography.subtitle,
  fieldSet: mixins.forms.fieldSet,
  fieldWrapContainer: mixins.forms.fieldWrapContainer,
  fieldWrap: mixins.forms.fieldWrap,
  fieldWrapShortOdd: mixins.forms.fieldWrapShortOdd,
  fieldWrapShortEven: mixins.forms.fieldWrapShortEven,
  fieldLabel: mixins.forms.label,
  fieldInput: mixins.forms.inputText,
  fieldButtons: mixins.forms.buttonsHolder,
  fieldSubmit: mixins.buttonPrimary(),
  termsLabel: merge({
    color: variables.colors.charcoal
  }, mixins.headings.p2),
  okHand: {
    left: `calc(${variables.padding.a} * -1)`,
    position: 'relative',
    top: variables.padding.b
  },
  radioLabel: mixins.forms.labelRadio,
  link: {
    color: variables.colors.royalBlue
  }
}

const styleSheet = StyleSheet.create({
  checkboxLabel: {
    alignItems: 'flex-start'
  }
})

module.exports = {
  getLegacyStyles: css(legacyStyles),
  styleSheet
}
