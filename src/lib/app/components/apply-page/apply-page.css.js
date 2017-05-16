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
  link: mixins.typography.copyLink,
  fingersCrossed: {
    left: '25%',
    margin: '0 auto',
    position: 'relative',
    [mixins.breakpoints.l]: {
      left: '50%'
    }
  },
  thumbsUp: {
    left: '-100%',
    margin: '0 auto',
    padding: `0 0 ${variables.padding.c} 0`,
    position: 'relative'
  },
  companyName: mixins.textHighlight()
}

export default css(styles)
