import React from 'react'
import { Link } from 'react-router-dom'
import NudjSuccess from '../nudj-success'

import style from './nudj-page.css'

export default (props) => {
  return (
    <div className={style.page}>
      <div className={style.box}>
        <iframe src='//giphy.com/embed/3oz8xsRKgCWlzkqT7y' width='480' height='270' frameBorder='0' className='giphy-embed' allowFullScreen />
        <NudjSuccess {...props} />
        <Link className={style.continue} to='/dashboard'>Continue to dashboard -></Link>
      </div>
    </div>
  )
}
