import css, { mixins, variables } from '../../lib/css'

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
  okHand: {
    left: `calc(${variables.padding.a} * -1)`,
    position: 'relative',
    top: variables.padding.b
  }
}

export default css(styles)
