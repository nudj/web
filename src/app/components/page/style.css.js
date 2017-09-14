const { css, merge } = require('@nudj/framework/css')
const { mixins } = require('../../lib/css')

module.exports = css({
  body: merge({
    fontFamily: [mixins.headings.p],
    overflowX: 'hidden',
    position: 'relative'
  }, mixins.flexColumn({
    alignItems: 'stretch'
  })),
  footer: mixins.beforeBackgroundSquiggle('bg-wiggle-charcoal.svg')
})
