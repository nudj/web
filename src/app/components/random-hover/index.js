const React = require('react')
const classnames = require('classnames')

const { buttonHoverOptionSVGs } = require('../../lib/css/variables')
const getStyle = require('./style.css')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// Only need a class for this to apply random hover styles to child buttons on the client only as it breaks the server/client-side rendering stack if we randomise in the css. In other words - css must be static!!!
class RandomHover extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {}
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  componentDidMount () {
    this.setState({
      className: this.style[`style${getRandomInt(1, buttonHoverOptionSVGs.length)}`]
    })
  }
  onMouseLeave (event) {
    this.setState({
      className: this.style[`style${getRandomInt(1, buttonHoverOptionSVGs.length)}`]
    })
    this.props.onMouseLeave && this.props.onMouseLeave(event)
  }
  render () {
    const Child = React.Children.only(this.props.children)
    return React.cloneElement(Child, {
      onMouseLeave: this.onMouseLeave,
      className: classnames(Child.props.className, this.state.className)
    })
  }
}

module.exports = RandomHover
