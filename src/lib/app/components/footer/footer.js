import React from 'react'
import style from './footer.css'

export default (props) => (
  <div className={style.container}>
    <small className={style.copyright}>&#169; 2017 <strong>nudj</strong>, All Rights Reserved</small>
    <a className={style.privacy} href='https://www.iubenda.com/privacy-policy/8051143'>Privacy</a>
  </div>
)
