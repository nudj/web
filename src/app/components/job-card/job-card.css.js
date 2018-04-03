const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  jobCard: merge({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no wrap',
    justifyContent: 'space-between'
  }),
  jobCardLeft: merge({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }),
  jobCardRight: merge({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no wrap',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }),
  jobTitle: merge(mixins.headings.h5, {
    color: variables.colors.royalBlue,
    textAlign: 'left',
    width: '100%'
  }),
  companyTitle: merge(mixins.headings.h6, {
    textDecoration: 'none',
    color: variables.colors.midRed,
    textAlign: 'left',
    width: '100%',
    paddingTop: variables.padding.e
  }),
  jobMetaList: merge(mixins.deList(), {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    paddingTop: variables.padding.d
  }),
  jobMetaItem: {
    marginRight: variables.padding.d
  },
  metaTitle: merge({
    color: variables.colors.charcoal,
    textAlign: 'left'
  }, mixins.headings.p),
  metaData: merge({
    color: variables.colors.charcoal,
    textAlign: 'left'
  }, mixins.headings.h6),
  jobLink: merge(mixins.headings.pBold, {
    color: variables.colors.midRed,
    textDecoration: 'none',
    textAlign: 'left',
    width: '100%'
  })
}

module.exports = css(styles)
