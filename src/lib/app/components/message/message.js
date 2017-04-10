import React from 'react'
import get from 'lodash/get'
import style from './message.css'

export default (props) => {
  return <div className={style.wrapper}>
    <div className={style[get(props, 'message.type')]}>
      <div className={style.copy}>{get(props, 'message.message')}</div>
    </div>
  </div>
}
