import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getStyle, setStyles } from './header.css'
import nudjLogo from './nudj-logo'

import get from 'lodash/get'

const offsetTrigger = 100

class Component extends React.Component {
  constructor (props) {
    super(props)

    const burgerActive = false
    const burgerStyle = 'hamburger'
    const mobileMenuStyle = 'mobileMenu'
    const navBarConstantStyle = 'navBarConstant'

    const colours = {
      backgroundColour: get(props, 'backgroundColour'),
      textColour: get(props, 'textColour'),
      textHighlightColour: get(props, 'textHighlightColour')
    }

    this.state = {burgerActive, burgerStyle, mobileMenuStyle, navBarConstantStyle, colours}
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
    window.requestAnimationFrame(this.updateNavBarActive.bind(this))
  }

  onClickBurger (event) {
    event.preventDefault()

    const burgerActive = !this.state.burgerActive
    const burgerStyle = burgerActive ? 'hamburgerIsActive' : 'hamburger'
    const mobileMenuStyle = burgerActive ? 'mobileMenuIsActive' : 'mobileMenu'

    this.setState({burgerActive, burgerStyle, mobileMenuStyle}, () => this.updateNavBarStyle())
  }

  onClickLink () {
    const burgerActive = false
    const burgerStyle = 'hamburger'
    const mobileMenuStyle = 'mobileMenu'

    this.setState({burgerActive, burgerStyle, mobileMenuStyle}, () => this.updateNavBarStyle())
  }

  updateNavBarActive () {
    const pageYOffset = window.pageYOffset
    const navBarActive = pageYOffset >= offsetTrigger

    this.setState({navBarActive}, () => this.updateNavBarStyle())
    window.requestAnimationFrame(() => {
      this.handlingScrollUpdate = false
    })
  }

  updateNavBarStyle () {
    const burgerActive = this.state.burgerActive
    const navBarActive = this.state.navBarActive
    const navBarConstantStyle = navBarActive || burgerActive ? 'navBarConstantIsActive' : 'navBarConstant'

    this.setState({navBarConstantStyle})
  }

  renderBrandLogo (colour) {
    const logo = nudjLogo(colour || this.state.colours.textColour)
    return logo
  }

  renderBurger (coloured = false) {
    let burgerClass = 'hamburger hamburger--elastic'

    if (this.state.burgerActive) {
      burgerClass += ' is-active'
    }

    const burgerColour = coloured ? this.style.burgerColoured : this.style.burgerColourDefault

    return (
      <div className={this.style.hamburgerHolder}>
        <button className={`${burgerClass} ${this.style.burger}`} type='button' onClick={this.onClickBurger.bind(this)}>
          <span className={`hamburger-box ${this.style.burgerBox}`}>
            <span className={`hamburger-inner ${burgerColour} ${this.style.burgerPosition}`} />
          </span>
        </button>
      </div>
    )
  }

  renderMobileMenu () {
    const baseStyleName = this.state.mobileMenuStyle
    const baseStyle = this.style[baseStyleName]
    return (
      <nav className={baseStyle}>
        {this.renderNavLinks(true)}
      </nav>
    )
  }

  renderNavBarConstant () {
    const baseStyleName = this.state.navBarConstantStyle
    const baseStyle = this.style[baseStyleName]
    return (<div className={baseStyle}>
      <a className={this.style.homeSmall} href='/' onClick={this.onClickLink.bind(this)}>
        <img className={this.style.brandSmall} src='/assets/images/nudj-logo-light-small.svg' alt='Nudj' />
      </a>
      {this.renderBurger()}
    </div>)
  }

  renderNavLinks (mobile = false) {
    const linkStyleName = mobile ? 'linkMobile' : 'link'

    const linkStyle = this.style[linkStyleName]
    const requestStyle = mobile ? this.style.requestMobile : this.style.request

    const about = (<a href='http://help.nudj.co' className={linkStyle} onClick={this.onClickLink.bind(this)} key='0'>About</a>)
    const companies = (<a href='/hiring' className={linkStyle} onClick={this.onClickLink.bind(this)} key='1'>Companies</a>)
    const getInTouch = (<a href='' id='open-intercom' className={requestStyle} onClick={this.onClickLink.bind(this)} key='2'>Get in touch</a>)

    const defaultNav = [about, companies, getInTouch]

    return (defaultNav)
  }

  render () {
    setStyles(this.state.colours.backgroundColour, this.state.colours.textColour, this.state.colours.textHighlightColour)
    this.style = getStyle()

    return (
      <div className={this.style.navContainer}>
        <nav className={this.style.nav}>
          <div className={this.style.navLeft}>
            <a className={this.style.homeButton} href='/' onClick={this.onClickLink.bind(this)}>
              {this.renderBrandLogo()}
            </a>
          </div>
          {this.renderNavBarConstant()}
          {this.renderMobileMenu()}
          <div className={this.style.navRight}>
            {this.renderBurger(true)}
            {this.renderNavLinks()}
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
