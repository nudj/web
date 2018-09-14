const React = require('react')
const PropTypes = require('prop-types')

const style = require('./style.css')

class RandomHover extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  render () {
    const { render } = this.props

    return render && render({
      style: style.hoverEffect,
      onMouseEnter: this.handleMouseEnter
    })
  }
}

module.exports = RandomHover
