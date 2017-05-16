import css, { mixins, variables } from '../../lib/css'

const styles = {
  body: mixins.flexColumn(),
  content: {
    width: '100%'
  },
  formHeader: mixins.basicContainerSmaller({
    paddingBottom: variables.padding.c,
    paddingTop: variables.padding.a,
    '::after': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage('thumbs-up.svg'),
      backgroundPosition: 'bottom right',
      backgroundRepeat: 'no-repeat',
      bottom: variables.padding.c,
      height: '100%',
      pointerEvents: 'none',
      position: 'absolute',
      right: '50%',
      width: '50vw'
    }),
    '::before': mixins.makePsuedoElement({
      backgroundImage: mixins.linkImage('fingers-crossed.svg'),
      backgroundPosition: 'top left',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      left: '50%',
      pointerEvents: 'none',
      position: 'absolute',
      top: '0',
      width: '50vw'
    })
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
  // This is in here for spacing/guidance - formHeader::after shows the image
  thumbsUp: {
    margin: '0 auto',
    opacity: '0',
    padding: `0 0 ${variables.padding.c} 0`,
    position: 'relative'
  },
  companyName: mixins.textHighlight()
}

export default css(styles)
