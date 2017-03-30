import React from 'react'
import NudjSuccess from '../nudj-success'

import style from './nudj-page.css'

export default (props) => {
  return (
    <div className={style.page}>
      <div className={style.box}>
        <iframe src="//giphy.com/embed/3oz8xsRKgCWlzkqT7y" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        <NudjSuccess {...props.page} />
        <a className={style.continue} href='/dashboard'>Continue to dashboard -></a>
      </div>
    </div>
  )
}
