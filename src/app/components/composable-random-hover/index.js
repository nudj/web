const React = require('react')
const PropTypes = require('prop-types')

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getHoverEffectIndex = () => getRandomInt(0, 6)

const style = require('./style.css')

class RandomHover extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  state = {
    hoverEffect: 0
  }

  handleMouseEnter = () => {
    this.setState({
      hoverEffect: getHoverEffectIndex()
    })
  }

  render () {
    const { hoverEffect } = this.state
    const { render } = this.props

    return render && render({
      style: style[hoverEffect],
      onMouseEnter: this.handleMouseEnter
    })
  }
}

module.exports = RandomHover
