const { css } = require('@nudj/framework/css')

const styles = {
  plainDisplay: {
    '^.js': {
      display: 'none'
    }
  }
}

module.exports = css(styles)
