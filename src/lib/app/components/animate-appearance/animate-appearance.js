import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import getStyle from './animate-appearance.css'

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const visible = false
    this.state = {visible}
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleScroll.bind(this))
    window.addEventListener('scroll', this.handleScroll.bind(this))
    window.requestAnimationFrame(() => this.handleScroll())
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleScroll.bind(this))
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
    const disappearDirection = get(this.props, 'from', 'default')
    const disappearClass = this.style[`${disappearDirection}Disappear`]
    const visibleClass = this.state.visible ? this.style.appear : disappearClass

    const inheritedClass = get(this.props, 'className', '')

    return (<div className={`${visibleClass} ${inheritedClass}`} ref='wrapper'>{this.props.children}</div>)
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
