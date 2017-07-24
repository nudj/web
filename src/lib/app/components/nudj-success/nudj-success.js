import React from 'react'
import get from 'lodash/get'
import { getStyle, setStyles } from './nudj-success.css'

export default (props) => {
  const backgroundColour = get(props, 'backgroundColour')
  const textColour = get(props, 'textColour')
  const textHighlightColour = get(props, 'textHighlightColour')
  const buttonTextColour = get(props, 'buttonTextColour')

  setStyles(backgroundColour, textColour, textHighlightColour, buttonTextColour)
  const style = getStyle()

  let link = `${get(props, 'url.protocol')}://${get(props, 'url.hostname')}/jobs/${get(props, 'company.slug')}+${get(props, 'job.slug')}+${get(props, 'referral.id')}`

  return (
    <div className={style.container}>
      <p className={style.mobileMessage}>Share your link by selecting an option below.</p>
      <div className={style.actions}>
        <a href={`fb-messenger://share/?link=${link}`} className={style.actionLink}>
          <div className={style.fbmLink}>
            <svg xmlns='http://www.w3.org/2000/svg' height='100%' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.11C24 4.974 18.627 0 12 0zm1.193 14.963l-3.056-3.26-5.963 3.26L10.733 8l3.13 3.26L19.752 8l-6.56 6.963z' />
            </svg>
          </div>
          <span className={style.actionTitle}>Messenger</span>
        </a>
        <a href={`whatsapp://send?text=${link}`} className={style.actionLink}>
          <div className={style.waLink}>
            <svg xmlns='http://www.w3.org/2000/svg' height='100%' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M11.997 0h.006C18.62 0 24 5.383 24 12s-5.381 12-11.997 12c-2.44 0-4.704-.727-6.6-1.982L.79 23.492l1.495-4.459A11.912 11.912 0 0 1 0 12C0 5.383 5.381 0 11.997 0zm-3.35 6.095c-.233-.557-.41-.578-.762-.592a6.775 6.775 0 0 0-.402-.014c-.459 0-.938.134-1.227.43-.353.36-1.228 1.2-1.228 2.92 0 1.722 1.256 3.387 1.425 3.62.176.232 2.447 3.816 5.974 5.277 2.757 1.143 3.575 1.037 4.203.903.917-.198 2.067-.875 2.356-1.693.289-.819.289-1.517.204-1.666-.084-.148-.317-.232-.67-.409-.352-.176-2.066-1.023-2.39-1.136-.318-.12-.621-.077-.861.262-.339.472-.67.952-.938 1.241-.212.226-.557.254-.846.134-.388-.162-1.474-.543-2.815-1.735-1.036-.924-1.742-2.074-1.946-2.42-.205-.352-.021-.557.141-.748.176-.218.346-.373.522-.578.176-.205.275-.31.388-.55.12-.233.035-.473-.05-.65-.084-.176-.79-1.897-1.079-2.596z' />
            </svg>
          </div>
          <span className={style.actionTitle}>WhatsApp</span>
        </a>
        <a id='copy' className={style.actionLink} data-clipboard-text={link}>
          <div className={style.copyLinkIcon}>
            <svg xmlns='http://www.w3.org/2000/svg' height='100%' viewBox='0 0 27 25'>
              <path fill='none' fillRule='evenodd' strokeLinecap='square' strokeWidth='2' d='M25 11.645l-10.626 9.809c-3.02 2.787-8.091 2.787-11.11 0a6.938 6.938 0 0 1 0-10.255l9.419-8.694a5.714 5.714 0 0 1 7.728 0c2.174 2.006 2.174 5.127 0 7.134l-8.694 7.914c-1.208 1.114-3.14 1.114-4.226 0-1.208-1.115-1.208-2.898 0-3.902l7.245-6.688' />
            </svg>
          </div>
          <span className={style.actionTitle} data-clipboard-label>Copy link</span>
        </a>
      </div>
      <div className={style.link}>
        <div className={style.linkContainer}>{link}</div>
        <button id='copy' className={style.copyLink} data-clipboard-text={link}>Copy link</button>
      </div>
    </div>
  )
}
