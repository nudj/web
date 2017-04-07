import React from 'react'
import style from './success-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.hero}>
      <div className={style.heroBody}>
        <img src='https://media.giphy.com/media/26ufmAlKt4ne2JDnq/giphy.gif' width='320' height='320' />
        <p className={style.header}>Nice one!</p>
        <p className={style.copy}>Someone from our team will be in touch shortly.</p>
      </div>
    </div>
  </div>
)
