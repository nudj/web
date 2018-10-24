const PropTypes = require('prop-types')
const { noop } = require('@nudj/library')
const style = require('./style.css')

const ComposableRandomHover = props => props.render({ style: style.hoverEffect })

ComposableRandomHover.defaultProps = { render: noop }
ComposableRandomHover.propTypes = { render: PropTypes.func.isRequired }

module.exports = ComposableRandomHover
