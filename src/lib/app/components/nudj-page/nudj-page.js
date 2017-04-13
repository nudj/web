import React from 'react'
import NudjSuccess from '../nudj-success'

import style from './nudj-page.css'

export default (props) => {
  return (
    <div className={style.page}>
      <div className={style.box}>
        <img src='https://media.giphy.com/media/3o6Zt3p4l4OyuWxvK8/giphy.gif' width='320' height='320' />
        <h1 className={style.heading}>Awesomesauce! Here's your special link to share with your friends...</h1>
        <NudjSuccess {...props} />
        <hr className={style.breakLine} />
        <div className={style.tip}>
          <h2 className={style.tipTitle}>Here's a little tip...</h2>
          <hr className={style.tipBreak} />
          <p className={style.tipBody}>Don't over think it. Just send it to straight to any of your friends that you think might be interested - they'll appreciate you thinking of them. &#x1F44D;</p>
        </div>
      </div>
    </div>
  )
}
