import React from 'react'
import { Link } from 'react-router-dom'
import style from './header.css'

export default (props) => {
  return (
    <nav className={style.nav}>
      <div className={style.left}>
        <Link className={style.home} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo.png' />
        </Link>
      </div>
      <div className={style.right}>
        <a href='http://help.nudj.co' className={style.learnMore}>Learn more</a>
        <Link to='/' className={style.link} >Job seeker</Link>
        <Link to='/hiring' className={style.link}>Hirer</Link>
        <Link to='' id='open-intercom' className={style.request}>Get in touch</Link>
      </div>
    </nav>
  )
}
