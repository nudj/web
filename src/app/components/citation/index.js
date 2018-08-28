const React = require('react')
const PropTypes = require('prop-types')

const { css } = require('@nudj/components/lib/css')
const { CustomPropTypes } = require('@nudj/components')
const styleSheet = require('./style.css')

const Citation = (props) => {
  const {
    Component,
    style,
    image,
    name,
    position,
    logo,
    side,
    ...rest
  } = props

  return (
    <Component
      {...rest}
      className={css(
        styleSheet.root,
        side === 'left' ? styleSheet.left : styleSheet.right,
        style
      )}
    >
      <img className={css(styleSheet.image)} src={image} />
      <div
        className={css(
          styleSheet.body,
          side === 'left' ? styleSheet.bodyLeft : styleSheet.bodyRight
        )}
      >
        <div className={css(styleSheet.name)}>{name}</div>
        {position && <div className={css(styleSheet.position)}>{position}</div>}
        {logo && (
          <div className={css(styleSheet.logo)}>
            <img src={logo} />
          </div>
        )}
      </div>
    </Component>
  )
}

Citation.propTypes = {
  Component: CustomPropTypes.component,
  style: CustomPropTypes.style,
  image: PropTypes.string,
  name: PropTypes.node,
  position: PropTypes.node,
  logo: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right'])
}

Citation.defaultProps = {
  Component: 'cite',
  side: 'left'
}

module.exports = Citation
