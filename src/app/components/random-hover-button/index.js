const React = require('react')
const { Link } = require('@nudj/components')

const ComposableRandomHover = require('../composable-random-hover')

const RandomHoverButton = ({ style, ...props }) => {
  return (
    <ComposableRandomHover
      render={({ style: hoverStyle }) => (
        <Link
          style={[style, hoverStyle]}
          {...props}
        />
      )}
    />
  )
}

module.exports = RandomHoverButton
