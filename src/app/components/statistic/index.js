const React = require('react')

const { css } = require('@nudj/components/lib/css')
const { CustomPropTypes } = require('@nudj/components')

const styleSheet = require('./style.css')

const Statistic = ({ style, ...rest }) => (
  <div className={css(style, styleSheet.root)} {...rest} />
)

Statistic.propTypes = {
  style: CustomPropTypes.style
}

module.exports = Statistic
