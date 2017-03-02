import React from 'react'
import style from './header.css'

export default () => (
  <nav className={style.nav}>
    <div className={style.left}>
      <a className={style.home} href="/">
        <img className={style.logo} src="/assets/images/nudj-logo.png"></img>
      </a>
    </div>
    <div className={style.right}>
      <a className={style.link} href="/">Request access</a>
    </div>
  </nav>
)
