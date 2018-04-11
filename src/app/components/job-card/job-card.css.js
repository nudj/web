const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  jobCard: merge({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexBasis: '100%',
    [mixins.breakpoints.ns]: {
      flexWrap: 'nowrap'
    }
  }),
  jobCardLeft: merge({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [mixins.breakpoints.ns]: {
      width: '75%'
    }
  }),
  jobCardRight: merge({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap'
  }),
  jobTitle: merge(mixins.headings.h5, {
    color: variables.colors.royalBlue,
    textAlign: 'left',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }),
  companyTitle: merge(mixins.headings.h6, {
    textDecoration: 'none',
    color: variables.colors.midRed,
    textAlign: 'left',
    width: '100%',
    paddingTop: variables.padding.e,
    flexGrow: '1'
  }),
  flexItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: '1'
  },
  jobMetaList: merge(mixins.deList(), {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: variables.padding.d
  }),
  jobMetaItem: {
    marginRight: variables.padding.d
  },
  metaTitle: merge({
    color: variables.colors.charcoal,
    textAlign: 'left'
  }, mixins.headings.small),
  metaData: merge({
    color: variables.colors.charcoal,
    textAlign: 'left'
  }, mixins.headings.h6),
  jobLink: merge(mixins.headings.pBold, {
    color: variables.colors.midRed,
    textDecoration: 'none',
    textAlign: 'left',
    width: '100%',
    marginTop: '1rem',
    [mixins.breakpoints.ns]: {
      marginTop: '0',
      marginLeft: '1rem'
    }
  })
}

module.exports = css(styles)
