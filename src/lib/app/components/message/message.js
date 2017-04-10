import React from 'react'
import get from 'lodash/get'
import style from './message.css'

export default (props) => {
  return <div className={style[`${get(props, 'message.type')}Message`]}>{get(props, 'message.message')}</div>
}
