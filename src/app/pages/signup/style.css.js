const { css } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
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
  radioList: mixins.forms.radioList,
  radio: mixins.forms.radioItem,
  radioInput: mixins.forms.inputRadio,
  radioPrettyLabel: mixins.forms.inputRadioLabel,
  radioLabel: mixins.forms.labelRadio,
  helper: mixins.forms.helperText,
  okHand: {
    left: `calc(${variables.padding.a} * -1)`,
    position: 'relative',
    top: variables.padding.b
  }
}

module.exports = css(styles)