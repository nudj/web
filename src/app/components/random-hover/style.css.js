const { css } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const getHoverStyle = (image) => {
  const left = mixins.linkImage(`${image}-left.svg`)
  const right = mixins.linkImage(`${image}-right.svg`)

  const before = {
    backgroundImage: left
  }

  const after = {
    backgroundImage: right
  }

  return {
    [mixins.breakpoints.l]: {
      '::after': after,
      '::before': before
    }
  }
}

module.exports = css(variables.buttonHoverOptionSVGs.reduce((styles, image, index) => {
  styles[`style${index}`] = getHoverStyle(image)
  return styles
}, {}))
