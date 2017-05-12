import css, { mixins, variables } from '../../lib/css'

const styles = {
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
  invalidInput: mixins.forms.inputText,
  fieldButtons: mixins.forms.buttonsHolder,
  fieldSubmit: mixins.buttonPrimary(),
  fingersCrossed: {
    left: '50%',
    margin: '0 auto',
    position: 'relative'
  },
  thumbsUp: {
    left: '50%',
    margin: '0 auto',
    padding: `0 0 ${variables.padding.c} 0`,
    position: 'relative'
  },
  companyName: {
    color: variables.colours.midRed
  }
}

export default css(styles)
