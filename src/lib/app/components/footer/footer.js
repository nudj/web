import React from 'react'
import style from './footer.css'

export default (props) => (
  <div className={style.container}>
    <small className={style.copyright}>&#169; 2017 <strong>nudj</strong>, All Rights Reserved</small>
    <div className={style.links}>
      <div className={style.link}>
        <a className={style.release} href='https://headwayapp.co/nudj-updates' target='_blank'>Release Notes</a>
        <p className={style.label}><small>Discover what we've just shipped.</small></p>
      </div>
      <div className={style.link}>
        <a className={style.roadmap} href='https://nudj.canny.io/product-roadmap' target='_blank'>Product Roadmap</a>
        <p className={style.label}><small>Help us decide what to build next.</small></p>
      </div>
      <div className={style.link}>
        <a className={style.hiring} href=''>We're Hiring!</a>
        <p className={style.label}><small>Help us build something awesome.</small></p>
      </div>
      <div className={style.link}>
        <a className={style.terms} href='https://www.iubenda.com/privacy-policy/8051143' target='_blank'>Terms &amp; Privacy</a>
        <p className={style.label}><small>The legal stuff, including &#x1F36A; policy.</small></p>
      </div>
    </div>
  </div>
)
