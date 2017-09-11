const { merge } = require('@nudj/framework/css')
const { css, mixins } = require('../../lib/css')

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
