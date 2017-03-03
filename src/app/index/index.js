import React from 'react'
import style from './index.css'
import Header from '../header'

export default () => (
  <div className={style.app}>
    <Header />
    <div className={style.container}>
      <div className={style.job}>
        <img className={style.logo} src='' />
        <h1 className={style.title}>Job title</h1>
        <h2 className={style.location}>Location</h2>
        <h2 className={style.salary}>Salary</h2>
        <ul className={style.links}>
          <li className={style.link}>
            <a href='#'>View company website</a>
          </li>
          <li className={style.link}>
            <a href='#'>View full job post</a>
          </li>
          <li className={style.social}>
            <a className={style.socialLink} href='#'>
              <i className={style.facebook}></i>
            </a>
          </li>
          <li className={style.social}>
            <a className={style.socialLink} href='#'>
              <i className={style.twitter}></i>
            </a>
          </li>
          <li className={style.social}>
            <a className={style.socialLink} href='#'>
              <i className={style.linkedin}></i>
            </a>
          </li>
          <li className={style.social}>
            <a className={style.socialLink} href='#'>
              <i className={style.instagram}></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)
