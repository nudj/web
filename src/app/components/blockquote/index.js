const React = require('react')
const PropTypes = require('prop-types')

const { css } = require('@nudj/components/lib/css')
const { CustomPropTypes } = require('@nudj/components')
const styleSheet = require('./style.css')

const Blockquote = ({ style, children, citation, ...rest }) => (
  <div {...rest} className={css(style, styleSheet.root)}>
    <blockquote className={css(styleSheet.quote)}>
      {children}
    </blockquote>
    {citation}
  </div>
)

Blockquote.propTypes = {
  citation: PropTypes.node,
  children: PropTypes.node,
  style: CustomPropTypes.style
}

module.exports = Blockquote
