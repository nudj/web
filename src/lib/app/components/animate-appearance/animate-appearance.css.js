import css, { mixins } from '../../lib/css'

const styles = {
  appear: mixins.appear(),
  defaultDisappear: mixins.disappear(),
  bottomDisappear: mixins.disappear('bottom'),
  leftDisappear: mixins.disappear('left'),
  rightDisappear: mixins.disappear('right'),
  topDisappear: mixins.disappear('top')
}

export default css(styles)
