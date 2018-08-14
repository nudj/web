const { css, merge } = require('@nudj/framework/css')
const { StyleSheet, sizes } = require('@nudj/components/lib/css')
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
  }
})

module.exports = {
  getLegacyStyles: css(legacyStyles),
  styleSheet
}
