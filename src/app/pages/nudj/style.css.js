const { merge } = require('@nudj/library')
const { StyleSheet, sizes } = require('@nudj/components/styles')
const { mixins, variables } = require('../../lib/css')

const topHeight = '422px'
const topWidth = '268px'

const topPlane = mixins.makePsuedoElement({
  backgroundImage: mixins.linkImage('paper-planes-01.svg'),
  backgroundPosition: 'top right',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: `calc(${topHeight} * 0.5)`,
  pointerEvents: 'none',
  position: 'absolute',
  right: '0',
  top: '0',
  width: `calc(${topWidth} * 0.5)`,
  [mixins.breakpoints.l]: {
    height: topHeight,
    width: topWidth
  },
  [mixins.breakpoints.xl]: {
    right: `calc(50vw - ${variables.breakpoints.xl} * 0.5)`
  }
})

const bottomHeight = '341px'
const bottomWidth = '407px'

const bottomPlane = mixins.makePsuedoElement({
  backgroundImage: mixins.linkImage('paper-planes-02.svg'),
  backgroundPosition: 'bottom left',
  backgroundRepeat: 'no-repeat',
  backgroundSize: `calc(${bottomWidth} * 0.5) calc(${bottomHeight} * 0.5)`,
  height: `calc(${bottomHeight} * 0.5)`,
  pointerEvents: 'none',
  position: 'relative',
  width: '100%',
  [mixins.breakpoints.l]: {
    backgroundSize: `${bottomWidth} ${bottomHeight}`,
    bottom: '340px', // complete guess
    left: '0',
    height: bottomHeight,
    position: 'absolute',
    width: bottomWidth
  },
  [mixins.breakpoints.xl]: {
    left: `calc(50vw - ${variables.breakpoints.xl} * 0.5)`
  }
})

const styles = StyleSheet.create({
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
  },
  inputField: {
    width: '100%',
    ':nth-child(n) + *': {
      marginTop: sizes.regular
    }
  },
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
  companyName: mixins.textHighlight(),
  page: mixins.flexColumn({
    '::before': topPlane,
    '::after': bottomPlane
  }),
  box: mixins.basicContainerMedium({
    padding: `${variables.padding.a} ${variables.padding.d} ${variables.padding.c} ${variables.padding.d}`,
    [mixins.breakpoints.l]: {
      paddingBottom: variables.padding.b
    }
  }),
  heading: merge({}, mixins.typography.title),
  success: merge({
    padding: `${variables.padding.c} 0`,
    textAlign: 'center'
  }, mixins.headings.p),
  tip: mixins.basicContainerSmaller(mixins.makeGreyWobbleBox({
    zIndex: '1', // Be above the plane
    [mixins.breakpoints.l]: {
      margin: `${variables.padding.c} auto`
    }
  })),
  tipTitle: merge({}, mixins.typography.h3, {
    marginBottom: variables.padding.e
  }),
  tipBody: merge({
    color: variables.colors.charcoal,
    textAlign: 'center'
  }, mixins.headings.p2)
})

module.exports = styles
