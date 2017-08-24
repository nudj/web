import css, { merge, mixins, variables } from '../../lib/css'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const styles = {
  token: {
    backgroundColor: variables.colours.white,
    padding: `${variables.padding.b} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.a} 0 ${variables.padding.b} 0`
    }
  },
  tokenHeader: mixins.basicContainer(),
  tokenHeaderTitle: merge({}, mixins.typography.titleCharcoal, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  tokenHeaderDescription: merge({}, mixins.typography.copy, {
    margin: `0 0 ${variables.padding.b} 0`,
    [mixins.breakpoints.l]: {
      textAlign: 'inherit'
    }
  }),
  shareLinkButton: mixins.buttonPrimary(),
  linkContainer: {
    backgroundColor: variables.colours.lighterGrey,
    borderColor: 'transparent',
    flex: 2,
    borderRadius: variables.sizes.formsInputBorderRadius,
    color: variables.colours.charcoal,
    fontFamily: 'monospace',
    padding: variables.padding.e,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  jobsList: mixins.deList(),
  jobsListItem: merge(listStyle, mixins.cardStyle, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    padding: variables.padding.d,
    margin: `${variables.padding.e} ${variables.padding.a} ${variables.padding.d}`,
    minHeight: variables.padding.e
  }),
  jobsListItemTitle: merge({}, mixins.headings.h6, {
    flex: 3
  }),
  buttonContainer: {
    flex: 1,
    margin: `0 ${variables.padding.d}`,
    textAlign: 'center',
    alignItems: 'center'
  }
}
const getStyle = css(styles)

export { getStyle }
