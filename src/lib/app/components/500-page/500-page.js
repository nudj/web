import React from 'react'
import getStyle from './500-page.css'

import Header from '../header'

export default (props) => {
  const style = getStyle()
  return (<div className={style.contentContainer}>
    <Header />
    <div className={style.content}>
      <div className={style.gif}>
        <img src='https://media.giphy.com/media/ZeB4HcMpsyDo4/giphy.gif' width='320' height='202' />
      </div>
      <p className={style.header}>Dang-it!</p>
      <p className={style.copy}>That wasn't supposed to happen.</p>
      <p className={style.error}>Error code: 500</p>
      <p className={style.copy}>An error has occurred and we're working to fix the problem! We’ll be up and running again shortly.</p>
      <p classname={style.copy}>If you need immediate help, then please <a className={style.link} href='' id='open-intercom'>contact us</a>.</p>
    </div>
  </div>)
}
