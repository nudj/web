import React from 'react'
import { Link } from 'react-router-dom'
import style from './footer.css'

export default (props) => (
  <div className={style.container}>
    <small className={style.copyright}>&#169; 2017 <strong>nudj</strong>, All Rights Reserved</small>
    <ul className={style.links}>
      <li className={style.link}>
        <Link className={style.release} to='//headwayapp.co/nudj-updates' target='_blank'>Release Notes</Link>
        <p className={style.label}><small>Discover what we've just shipped.</small></p>
      </li>
      <li className={style.link}>
        <Link className={style.roadmap} to='//nudj.canny.io/product-roadmap' target='_blank'>Product Roadmap</Link>
        <p className={style.label}><small>Help us decide what to build next.</small></p>
      </li>
      <li className={style.link}>
        <Link className={style.hiring} to=''>We're Hiring!</Link>
        <p className={style.label}><small>Help us build something awesome.</small></p>
      </li>
      <li className={style.link}>
        <Link className={style.terms} to='//www.iubenda.com/privacy-policy/8051143' target='_blank'>Terms &amp; Privacy</Link>
        <p className={style.label}><small>The legal stuff, including &#x1F36A; policy.</small></p>
      </li>
    </ul>
  </div>
)
