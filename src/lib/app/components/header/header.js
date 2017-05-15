import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import style from './header.css'

const lightLogoPages = ['/hiring']
const offsetTrigger = 100

class Component extends React.Component {
  constructor (props) {
    super(props)

    const burgerActive = false
    const burgerStyle = 'hamburger'
    const mobileMenuStyle = 'mobileMenu'
    const navBarConstantStyle = 'navBarConstant'

    this.state = {burgerActive, burgerStyle, mobileMenuStyle, navBarConstantStyle}
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

  renderBrandLogo () {
    if (lightLogoPages.includes(this.props.location.pathname)) {
      return (<img className={style.homeButtonImage} src='/assets/images/nudj-logo-light.svg' alt='Nudj' />)
    } else {
      return (<img className={style.homeButtonImage} src='/assets/images/nudj-logo-dark.svg' alt='Nudj' />)
    }
  }

  renderBurger (baseStyleName) {
    const baseStyle = style[baseStyleName]
    let burgerClass = 'hamburger hamburger--elastic'

    if (this.state.burgerActive) {
      burgerClass += ' is-active'
    }

    return (
      <div className={style.hamburgerHolder}>
        <button className={`${burgerClass} ${style.burger}`} type='button' onClick={this.onClickBurger.bind(this)}>
          <span className={`hamburger-box ${style.burgerBox}`}>
            <span className={`hamburger-inner ${baseStyle}`} />
          </span>
        </button>
      </div>
    )
  }

  renderBurgerDark () {
    const baseStyleName = this.state.burgerStyle
    return this.renderBurger(baseStyleName)
  }

  renderBurgerLight () {
    const baseStyleName = this.state.burgerStyle + 'Light'
    return this.renderBurger(baseStyleName)
  }

  renderDesktopBurger () {
    if (lightLogoPages.includes(this.props.location.pathname)) {
      return this.renderBurgerLight()
    } else {
      return this.renderBurgerDark()
    }
  }

  renderMobileMenu () {
    const baseStyleName = this.state.mobileMenuStyle
    const baseStyle = style[baseStyleName]
    return (
      <nav className={baseStyle}>
        {this.renderNavLinks(true)}
      </nav>
    )
  }

  renderNavBarConstant () {
    const baseStyleName = this.state.navBarConstantStyle
    const baseStyle = style[baseStyleName]
    return (<div className={baseStyle}>
      <a className={style.homeSmall} href='/' onClick={this.onClickLink.bind(this)}>
        <img className={style.brandLightSmall} src='/assets/images/nudj-logo-light-small.svg' alt='Nudj' />
      </a>
      {this.renderBurgerLight()}
    </div>)
  }

  renderNavLinks (mobile = false) {
    let linkStyleName = mobile ? 'linkMobile' : 'link'

    if (lightLogoPages.includes(this.props.location.pathname) && !mobile) {
      linkStyleName += 'Light'
    }

    const linkStyle = style[linkStyleName]
    const requestStyle = mobile ? style.requestMobile : style.request

    const about = (<a href='http://help.nudj.co' className={linkStyle} onClick={this.onClickLink.bind(this)} key='0'>About</a>)
    const companies = (<a href='/hiring' className={linkStyle} onClick={this.onClickLink.bind(this)} key='1'>Companies</a>)
    const getInTouch = (<a href='' id='open-intercom' className={requestStyle} onClick={this.onClickLink.bind(this)} key='2'>Get in touch</a>)

    const defaultNav = [about, companies, getInTouch]

    return (defaultNav)
  }

  render () {
    const baseStyleName = lightLogoPages.includes(this.props.location.pathname) ? 'navContainer' : 'navContainerDark'
    const baseStyle = style[baseStyleName]

    return (
      <div className={baseStyle}>
        <nav className={style.nav}>
          <div className={style.navLeft}>
            <a className={style.homeButton} href='/' onClick={this.onClickLink.bind(this)}>
              {this.renderBrandLogo(false)}
            </a>
          </div>
          {this.renderNavBarConstant()}
          {this.renderMobileMenu()}
          <div className={style.navRight}>
            {this.renderDesktopBurger()}
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
