const React = require('react')
const get = require('lodash/get')

const getStyle = require('./animate-appearance.css')

class AnimateAppearance extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const visible = false
    this.state = {visible}
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
    window.requestAnimationFrame(() => this.handleScroll())
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    if (this.handlingScrollUpdate) {
      return
    }

    this.handlingScrollUpdate = true

    const element = this.refs.wrapper

    // This is the height of the viewport
    const viewportHeight = window.innerHeight

    // This is the offset from the top of the viewport
    const { top } = element.getBoundingClientRect()

    const currentlyVisible = this.state.visible
    // Should make the offset number customisable?
    const fromBottom = Math.min(viewportHeight * 0.25, 150)
    const visible = (top <= viewportHeight - fromBottom)

    if (visible === currentlyVisible) {
      return this.resetHandleScroll()
    }

    this.setState({ visible }, this.resetHandleScroll)
  }

  resetHandleScroll () {
    window.requestAnimationFrame(() => {
      this.handlingScrollUpdate = false
    })
  }

  render () {
    const disappearDirection = get(this.props, 'from', 'default')
    const disappearClass = this.style[`${disappearDirection}Disappear`]
    const visibleClass = this.state.visible ? this.style.appear : disappearClass

    const inheritedClass = get(this.props, 'className', '')

    return (<div className={`${visibleClass} ${inheritedClass}`} ref='wrapper'>{this.props.children}</div>)
  }
}

module.exports = AnimateAppearance
