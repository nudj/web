import css, { merge, mixins, variables } from '../../lib/css'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const leftAlign = {
  [mixins.breakpoints.l]: {
    textAlign: 'inherit'
  }
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
  tokenHeaderTitle: merge({}, mixins.typography.titleCharcoal, leftAlign, {
    margin: `0 0 ${variables.padding.b} 0`
  }),
  tokenHeaderDescription: merge({}, mixins.typography.copy, leftAlign, {
    margin: `0 0 ${variables.padding.b} 0`
  }),
  tokenContent: mixins.basicContainer(),
  tokenTitle: merge({}, mixins.typography.subtitle, leftAlign),
  tokenCopy: merge({}, mixins.typography.copy, leftAlign),
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
  },
  getSurveyResults: mixins.buttonSecondary(),
  table: merge({}, mixins.basicTable.table, {
    overflow: 'hidden',
    tableLayout: 'fixed'
  }),
  tableHeaderRow: mixins.basicTable.tableHeaderRow,
  tableHeader: merge({}, mixins.basicTable.tableHeader, {
    fontWeight: 'bold',
    textAlign: 'left'
  }),
  tableHeaderFirst: merge({}, mixins.basicTable.tableHeaderFirst, {
    width: variables.padding.c
  }),
  tableBody: mixins.basicTable.tableBody,
  tableRow: mixins.basicTable.tableRow,
  tableCell: merge({}, mixins.basicTable.tableCell, {
    textAlign: 'left'
  }),
  tableCellEvenRow: merge({}, mixins.basicTable.tableCell, {
    backgroundColor: variables.colours.lighterGrey,
    textAlign: 'left'
  }),
  tableCellFirst: {
    padding: `${variables.padding.d} ${variables.padding.e}`
  }
}
const getStyle = css(styles)

export { getStyle }
