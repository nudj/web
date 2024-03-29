const React = require('react')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

const { getStyle, setStyles } = require('./header.css')
const nudjLogo = require('./nudj-logo')

const offsetTrigger = 100

class Header extends React.Component {
  constructor (props) {
    super(props)

    const burgerActive = false
    const burgerStyle = 'hamburger'
    const mobileMenuStyle = 'mobileMenu'
    const navBarConstantStyle = 'navBarConstant'

    const colours = {
      backgroundColour: get(props, 'backgroundColour'),
      textColour: get(props, 'textColour'),
      textHighlightColour: get(props, 'textHighlightColour'),
      buttonTextColour: get(props, 'buttonTextColour')
    }

    this.state = {burgerActive, burgerStyle, mobileMenuStyle, navBarConstantStyle, colours}

    this.handleScroll = this.handleScroll.bind(this)
    this.updateNavBarActive = this.updateNavBarActive.bind(this)
    this.onClickLink = this.onClickLink.bind(this)
    this.onClickBurger = this.onClickBurger.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    if (this.handlingScrollUpdate) {
      return
    }

    this.handlingScrollUpdate = true
    window.requestAnimationFrame(this.updateNavBarActive)
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
        <button id='mobileMenu' className={`${burgerClass} ${this.style.burger}`} type='button' onClick={this.onClickBurger}>
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
      <Link className={this.style.homeSmall} to='/' onClick={this.onClickLink}>
        <img className={this.style.brandSmall} src='/assets/images/nudj-logo-light-small.svg' alt='Nudj' />
      </Link>
      {this.renderBurger()}
    </div>)
  }

  renderNavLinks (mobile = false) {
    const linkStyleName = mobile ? 'linkMobile' : 'link'
    const isActiveEmployers = this.props.location === '/'
    const isActiveTalent = this.props.location === '/talent'
    const isActiveAbout = this.props.location === '/about'
    const hireUrl = `${process.env.HIRE_PROTOCOL}://${process.env.HIRE_HOST}`

    const linkStyleEmployers = isActiveEmployers ? this.style[`${linkStyleName}ActiveEmployers`] : this.style[linkStyleName]
    const linkStyleTalent = isActiveTalent ? this.style[`${linkStyleName}ActiveTalent`] : this.style[linkStyleName]
    const linkStyleAbout = isActiveAbout ? this.style[`${linkStyleName}ActiveAbout`] : this.style[linkStyleName]

    const companies = (<a href='/' className={linkStyleEmployers} id='hirerPage' onClick={this.onClickLink} key='2'>Employers</a>)
    const talent = (<a href='/talent' className={linkStyleTalent} id='talentPage' onClick={this.onClickLink} key='1'>Talent</a>)
    const about = (<a href='/about' className={linkStyleAbout} id='aboutPage' onClick={this.onClickLink} key='4'>About Us</a>)
    const login = (<a href={hireUrl} className={this.style[linkStyleName]} id='login' onClick={this.onClickLink} key='5'>Login</a>)

    const defaultNav = [companies, talent, about, login]

    return (defaultNav)
  }

  render () {
    setStyles(this.state.colours.backgroundColour, this.state.colours.textColour, this.state.colours.textHighlightColour, this.state.colours.buttonTextColour)
    this.style = getStyle()

    return (
      <div className={this.style.navContainer}>
        <nav className={this.style.nav}>
          <div className={this.style.navLeft}>
            <Link className={this.style.homeButton} to='/' onClick={this.onClickLink}>
              {this.renderBrandLogo()}
            </Link>
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

module.exports = Header
