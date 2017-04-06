import React from 'react'
import style from './success-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.hero}>
      <div className={style.heroBody}>
        <iframe src='//giphy.com/embed/26ufmAlKt4ne2JDnq?html5=true' width='300' height='300' frameBorder='0' />
        <p className={style.header}>Nice one!</p>
        <p className={style.copy}>Someone from our team will be in touch shortly.</p>
      </div>
    </div>
  </div>
)
