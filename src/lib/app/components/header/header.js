import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
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
      return (<img className={style.brand} src='/assets/images/nudj-logo-light.svg' alt='Nudj' />)
    } else {
      return (<img className={style.brandDark} src='/assets/images/nudj-logo-dark.svg' alt='Nudj' />)
    }
  }

  renderBurger (baseStyleName) {
    const baseStyle = style[baseStyleName]

    return (
      <div className={style.hamburgerHolder}>
        <button className={baseStyle} type='button' onClick={this.onClickBurger.bind(this)}>
          <span className={style.hamburgerBox}>
            <span className={style.hamburgerInner} />
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

  renderMobileMenu () {
    const baseStyleName = this.state.mobileMenuStyle
    const baseStyle = style[baseStyleName]
    return (
      <nav className={baseStyle}>
        <a href='http://help.nudj.co' className={style.linkMobile} onClick={this.onClickLink.bind(this)}>Learn more</a>
        <Link to='/' className={style.linkMobile} onClick={this.onClickLink.bind(this)}>Companies</Link>
        <Link to='/hiring' className={style.linkMobile} onClick={this.onClickLink.bind(this)}>About</Link>
        <Link to='' id='open-intercom' className={style.requestMobile} onClick={this.onClickLink.bind(this)}>Sign up</Link>
      </nav>
    )
  }

  renderNavBarConstant () {
    const baseStyleName = this.state.navBarConstantStyle
    const baseStyle = style[baseStyleName]
    return (<div className={baseStyle}>
      <Link className={style.homeSmall} to='/' onClick={this.onClickLink.bind(this)}>
        <img className={style.brandLightSmall} src='/assets/images/nudj-logo-light-small.svg' alt='Nudj' />
      </Link>
      {this.renderBurgerLight()}
    </div>)
  }

  render () {
    return (
      <nav className={style.nav}>
        <div className={style.left}>
          <Link className={style.home} to='/' onClick={this.onClickLink.bind(this)}>
            {this.renderBrandLogo(false)}
          </Link>
        </div>
        {this.renderNavBarConstant()}
        {this.renderMobileMenu()}
        <div className={style.right}>
          {this.renderBurgerDark()}
          <a href='http://help.nudj.co' className={style.link}>Learn more</a>
          <Link to='/' className={style.link} >Companies</Link>
          <Link to='/hiring' className={style.link}>About</Link>
          <Link to='' id='open-intercom' className={style.request}>Sign up</Link>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
