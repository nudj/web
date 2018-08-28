const React = require('react')
const PropTypes = require('prop-types')

const { css } = require('@nudj/components/lib/css')
const { CustomPropTypes } = require('@nudj/components')
const styleSheet = require('./style.css')

const WobblyBox = ({ style, backgroundColor, children, ...rest }) => (
  <div
    {...rest}
    className={css(
      style,
      styleSheet.root,
      backgroundColor && styleSheet[backgroundColor]
    )}
  >
    <div className={css(styleSheet.inner)}>
      {children}
    </div>
  </div>
)

WobblyBox.propTypes = {
  style: CustomPropTypes.style,
  children: PropTypes.node,
  backgroundColor: PropTypes.oneOf([
    'primary',
    'greyLightest',
    'charcoal',
    'midRed',
    'white'
  ])
}

module.exports = WobblyBox
