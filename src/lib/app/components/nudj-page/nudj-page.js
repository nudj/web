import React from 'react'
import NudjSuccess from '../nudj-success'

import style from './nudj-page.css'

export default (props) => {
  return (
    <div className={style.page}>
      <div className={style.box}>
        <img src='https://media.giphy.com/media/3o6Zt3p4l4OyuWxvK8/giphy.gif' width='320' height='320' />
        <NudjSuccess {...props} />
      </div>
    </div>
  )
}
