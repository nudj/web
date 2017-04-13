import React from 'react'
import get from 'lodash/get'
import style from './nudj-success.css'

export default (props) => {
  let link = `${get(props, 'url.protocol')}://${get(props, 'url.hostname')}/${get(props, 'company.slug')}/${get(props, 'job.slug')}+${get(props, 'referral.id')}`
  return (
    <div className={style.container}>
      <div className={style.link}>
        <div className={style.linkContainer}>{link}</div>
        <input className={style.copyLink} type='submit' value='Copy' />
      </div>
      <ul className={style.actions}>
        <li className={style.socialAction}>
          <a href={`whatsapp://send?text=${link}`} className={style.waLink}>
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M11.997 0h.006C18.62 0 24 5.383 24 12s-5.38 12-11.997 12c-2.44 0-4.704-.727-6.6-1.982L.79 23.492l1.495-4.46A11.912 11.912 0 0 1 0 12C0 5.383 5.38 0 11.997 0zm-3.35 6.095c-.233-.557-.41-.578-.762-.592a6.775 6.775 0 0 0-.402-.014c-.46 0-.938.132-1.227.43-.353.36-1.228 1.2-1.228 2.92s1.256 3.385 1.425 3.62c.176.23 2.447 3.814 5.974 5.275 2.757 1.143 3.575 1.037 4.203.903.917-.2 2.067-.876 2.356-1.694.29-.82.29-1.517.204-1.666-.084-.148-.317-.232-.67-.41-.352-.175-2.066-1.022-2.39-1.135-.318-.12-.62-.077-.86.262-.34.472-.67.952-.94 1.24-.21.227-.556.255-.845.135-.388-.162-1.474-.543-2.815-1.735-1.036-.924-1.742-2.074-1.946-2.42-.205-.352-.02-.557.14-.748.177-.22.347-.374.523-.58.176-.204.275-.31.388-.55.12-.232.035-.472-.05-.65-.084-.175-.79-1.896-1.08-2.595z' fill='#25D366' fillRule='evenodd' />
            </svg>
            <span className={style.linkText}>Whatsapp</span>
          </a>
        </li>
        <li className={style.socialAction}>
          <a href={`fb-messenger://share/?link=${link}`} className={style.fbmLink}>
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 0C5.373 0 0 4.975 0 11.11c0 3.498 1.745 6.617 4.472 8.653V24l4.086-2.242c1.09.3 2.246.464 3.442.464 6.627 0 12-4.974 12-11.11C24 4.974 18.627 0 12 0zm1.193 14.963l-3.056-3.26-5.963 3.26L10.734 8l3.13 3.26L19.75 8l-6.56 6.963z' fill='#007FFF' fillRule='evenodd' />
            </svg>
            <span className={style.linkText}>Facebook Messenger</span>
          </a>
        </li>
        <li className={style.socialAction}>
          <a href={`mailto:%20?subject=Hey%20I%20found%20this%20awesome%20job%20and%20thought%20of%20you&body=${link}`} className={style.gLink}>
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <g fill='none' fillRule='evenodd'>
                <path d='M5.018 12c0-.762.13-1.493.36-2.178L1.34 6.802A11.528 11.528 0 0 0 .11 12c0 1.868.442 3.63 1.228 5.194l4.036-3.025A6.81 6.81 0 0 1 5.018 12' fill='#FBBC05' />
                <path d='M12.11 5.067c1.69 0 3.217.586 4.417 1.546l3.49-3.413C17.89 1.387 15.164.267 12.11.267c-4.742 0-8.818 2.655-10.77 6.535l4.04 3.02c.93-2.766 3.582-4.755 6.73-4.755' fill='#EB4335' />
                <path d='M12.11 18.933c-3.15 0-5.8-1.99-6.732-4.755l-4.038 3.02c1.95 3.88 6.027 6.535 10.77 6.535 2.926 0 5.72-1.017 7.817-2.924l-3.833-2.904c-1.082.667-2.444 1.026-3.985 1.026' fill='#34A853' />
                <path d='M23.563 12c0-.693-.11-1.44-.273-2.133H12.11V14.4h6.436c-.322 1.546-1.198 2.734-2.45 3.507l3.832 2.902c2.203-2.004 3.636-4.986 3.636-8.81' fill='#4285F4' />
              </g>
            </svg>
            <span className={style.linkText}>Google</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
