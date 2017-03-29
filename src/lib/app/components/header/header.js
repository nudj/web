import React from 'react'
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
        <div className={style.container}>
          <div className={style.left}>
            <a className={style.home} href='/'>
              <img className={style.brand} src='/assets/images/nudj-logo.png' />
            </a>
          </div>
          <span className={style.toggle} onClick={this.onClickToggle}>
            <span />
            <span />
            <span />
          </span>
          <div className={`${style.right} ${this.state.menuOpen ? style.isActive : ''}`}>
            <a className={style.login} href='/request'>Log in</a>
            <span className={style.padding} />
            <a className={style.request} href='/request'>Request access</a>
          </div>
        </div>
      </nav>
    )
  }
}
