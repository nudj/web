import React from 'react'
import { Link } from 'react-router-dom'
import style from './header.css'

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
          <a href='http://help.nudj.co' className={style.link}>Learn more</a>
          <Link to='/' className={style.link} >Looking for a job</Link>
          <Link to='/hiring' className={style.link}>Currently hiring</Link>
          <Link to='' id='open-intercom' className={style.request}>Get in touch</Link>
        </div>
      </nav>
    )
  }
}
