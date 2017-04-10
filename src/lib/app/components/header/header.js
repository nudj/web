import React from 'react'
import { Link } from 'react-router-dom'
import style from './header.css'

function renderLoginLogout (person) {
  let html
  if (person) {
    html = <Link className={style.login} to='/logout'>Logout</Link>
  } else {
    html = <Link className={style.login} to='/login'>Log in</Link>
  }
  return html
}

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.onClickToggle = this.onClickToggle.bind(this)
    this.state = {
      menuOpen: false
    }
  }
  onClickToggle () {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }
  render () {
    return (
      <nav className={style.nav}>
        <div className={style.left}>
          <Link className={style.home} to='/'>
            <img className={style.brand} src='/assets/images/nudj-logo.png' />
          </Link>
        </div>
        <span className={style.toggle} onClick={this.onClickToggle}>
          <span />
          <span />
          <span />
        </span>
        <div className={`${style.right} ${this.state.menuOpen ? style.isActive : ''}`}>
          <Link to='//help.nudj.co' className={style.link}>Help</Link>
          <Link to='/' className={style.link} >Jobs</Link>
          <Link to='/hiring' className={style.link}>Hiring</Link>
          {renderLoginLogout(this.props.person)}
          <Link to='/request' className={style.request}>Request access</Link>
        </div>
      </nav>
    )
  }
}
