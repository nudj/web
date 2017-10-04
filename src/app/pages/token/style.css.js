const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const centerAlign = {
  [mixins.breakpoints.l]: {
    textAlign: 'center'
  }
}

const styles = {
  token: {
    backgroundColor: variables.colors.white,
    padding: `${variables.padding.c} 0`,
    position: 'relative',
    [mixins.breakpoints.l]: {
      padding: `${variables.padding.b} 0 ${variables.padding.b} 0`
    }
  },
  tokenHeader: {
    position: 'relative'
  },
  tokenHeaderContent: mixins.basicContainer(),
  tokenHeaderTitle: merge(mixins.typography.titleCharcoal, centerAlign),
  tokenHeaderDescription: merge(mixins.typography.copy, centerAlign, {
    margin: `0 0 ${variables.padding.c} 0`
  }),
  tokenContent: mixins.basicContainer(),
  tokenTitle: merge(mixins.typography.subtitle, centerAlign, {
    margin: `0 0 ${variables.padding.e} 0`
  }),
  tokenCopy: merge(mixins.typography.copy, centerAlign, {
    margin: `0 0 ${variables.padding.c} 0`
  }),
  shareLinkButton: mixins.buttonPrimary(),
  linkContainer: merge(mixins.linkContainer, {
    display: 'none',
    flex: '2',
    margin: '0',
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  }),
  jobsList: mixins.basicContainer(mixins.deList({
    padding: `0 0 ${variables.padding.b} 0`
  })),
  jobsListNudjSuccess: {
    [mixins.breakpoints.l]: {
      display: 'none'
    }
  },
  jobsListItem: merge(listStyle, mixins.cardStyle, {
    margin: variables.padding.d,
    paddingTop: variables.padding.c,
    [mixins.breakpoints.l]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      padding: variables.padding.d,
      margin: `${variables.padding.e} 0 ${variables.padding.d} 0`,
      minHeight: variables.padding.e
    }
  }),
  jobsListItemTitle: merge(mixins.headings.h6, {
    padding: `0 0 ${variables.padding.d} 0`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      flex: '2',
      padding: '0',
      textAlign: 'left'
    }
  }),
  buttonContainer: {
    alignItems: 'center',
    display: 'none',
    flex: '1',
    margin: `0 ${variables.padding.d}`,
    textAlign: 'center',
    [mixins.breakpoints.l]: {
      display: 'block'
    }
  },
  getSurveyResults: mixins.buttonSecondary(),
  table: merge(mixins.basicTable.table, {
    overflow: 'hidden',
    tableLayout: 'fixed'
  }),
  tableHeaderRow: mixins.basicTable.tableHeaderRow,
  tableHeader: merge(mixins.basicTable.tableHeader, {
    fontWeight: 'bold',
    textAlign: 'left'
  }),
  tableHeaderFirst: merge(mixins.basicTable.tableHeaderFirst, {
    width: variables.padding.c
  }),
  tableBody: mixins.basicTable.tableBody,
  tableRow: mixins.basicTable.tableRow,
  tableCell: merge(mixins.basicTable.tableCell, {
    textAlign: 'left'
  }),
  tableCellEvenRow: merge(mixins.basicTable.tableCell, {
    backgroundColor: variables.colors.lighterGrey,
    textAlign: 'left'
  }),
  tableCellFirst: {
    padding: `${variables.padding.d} ${variables.padding.e}`
  }
}
const getStyle = css(styles)

module.exports = { getStyle }
