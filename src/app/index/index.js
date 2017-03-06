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
        <div className={style.actions}>
          <div className={style.action}>
            <p>Interested? It only takes 2 seconds to apply & you don’t need a CV.</p><a className={style.apply} href='#'>Apply</a>
          </div>
          <div className={style.action}>
            <p>Know someone perfect? We’ll give you £X,XXX if they get the job.</p><a className={style.nudj} href='#'>Nudj</a>
          </div>
        </div>
        <div className={style.related}>
          <h2 className={style.relatedTitle}>Other positions</h2>
          <ul>
            <li>
              <a href="#">Job Title, Location</a>
            </li>
            <li>
              <a href="#">Job Title, Location</a>
            </li>
            <li>
              <a href="#">Job Title, Location</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)
