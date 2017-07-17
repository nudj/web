import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import getStyle from './animate-appearance.css'

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const visible = false
    this.state = {visible}
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
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
    // Should make the offset number customisable
    const visible = (top <= viewportHeight * 0.75)

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
    const className = this.state.visible ? this.style.appear : this.style.disappear
    return (<div className={className} ref='wrapper'>{this.props.children}</div>)
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
