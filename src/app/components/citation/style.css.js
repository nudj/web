const { StyleSheet, colors, sizes, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row-reverse'
  },
  image: {
    maxWidth: '6.375rem'
  },
  body: {
    whiteSpace: 'no-wrap'
  },
  bodyLeft: {
    marginLeft: sizes.regular
  },
  bodyRight: {
    marginRight: sizes.regular
  },
  name: {
    ...typography.type.regular,
    fontWeight: typography.fontWeight.bold,
    fontStyle: 'normal',
    color: colors.text
  },
  position: {
    ...typography.type.regular,
    fontWeight: typography.fontWeight.bold,
    fontStyle: 'normal',
    color: colors.greyDark
  },
  logo: {
    marginTop: sizes.regular
  }
})

module.exports = styleSheet
