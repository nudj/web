const { css, merge } = require('@nudj/framework/css')
const { StyleSheet, typography, colors, sizes } = require('@nudj/components/lib/css')
const { mixins, variables } = require('../../lib/css')

const legacyStyles = {
  body: mixins.flexColumn(),
  content: {
    width: '100%'
  },
  formHeader: mixins.basicContainerMedium({
    paddingBottom: variables.padding.c,
    [mixins.breakpoints.ns]: {
      paddingTop: variables.padding.a
    },
    paddingTop: variables.padding.c
  }),
  title: mixins.typography.title,
  subtitle: merge(mixins.typography.copy, {
    [mixins.breakpoints.ns]: {
      margin: `0 0 ${variables.padding.d} 0`
    }
  }),
  formSection: mixins.forms.fieldSet,
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
  inputFieldLabel: {
    ...typography.type.regular,
    color: colors.text
  },
  inputFieldDescription: {
    ...typography.type.smallI
  }
})

module.exports = {
  getLegacyStyles: css(legacyStyles),
  styleSheet
}
