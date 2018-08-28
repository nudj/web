const React = require('react')
const PropTypes = require('prop-types')

const { css } = require('@nudj/components/lib/css')
const { CustomPropTypes } = require('@nudj/components')
const styleSheet = require('./style.css')

const Section = ({ style, backgroundColor, children, ...rest }) => (
  <section
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
  </section>
)

Section.propTypes = {
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

module.exports = Section
