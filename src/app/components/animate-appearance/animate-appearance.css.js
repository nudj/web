const { css, mixins } = require('../../lib/css')

const styles = {
  appear: mixins.appear(),
  defaultDisappear: mixins.disappear(),
  bottomDisappear: mixins.disappear('bottom'),
  leftDisappear: mixins.disappear('left'),
  rightDisappear: mixins.disappear('right'),
  topDisappear: mixins.disappear('top')
}

module.exports = css(styles)
