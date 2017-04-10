import React from 'react'
import style from './404-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.hero}>
      <div className={style.heroBody}>
        <iframe src='//giphy.com/embed/k61nOBRRBMxva' width='320' height='217' frameBorder='0' allowFullScreen />
        <p className={style.header}>Oops!</p>
        <p className={style.copy}>We can't seem to find the page you're looking for.</p>
        <small className={style.error}>Error code: 404</small>
        <p className={style.copy}>Here are some helpful links instead:</p>
        <div className={style.pages}>
          <a className={style.links} href='/'>Home</a>
          <a className={style.links} href='/request'>Request access</a>
          <a className={style.links} href='' id='open-intercom'>Contact us</a>
        </div>
      </div>
    </div>
  </div>
)
