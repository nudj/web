import React from 'react'
import get from 'lodash/get'
import style from './nudj-success.css'

export default (props) => {
  let link = `${get(props, 'url.protocol')}://${get(props, 'url.hostname')}/jobs/${get(props, 'company.slug')}+${get(props, 'job.slug')}+${get(props, 'referral.id')}`

  const isNudj = (/\/nudj(\/?)$/).test(props.location.pathname)

  const linkContainerStyleName = isNudj ? 'linkContainer' : 'linkContainerClear'
  const copyLinkStyleName = isNudj ? 'copyLink' : 'copyLinkClear'

  const linkContainerStyle = style[linkContainerStyleName]
  const copyLinkStyle = style[copyLinkStyleName]

  return (
    <div className={style.container}>
      <div className={style.link}>
        <div className={linkContainerStyle}>{link}</div>
        <button id='copy' className={copyLinkStyle} data-clipboard-text={link}>Copy link</button>
      </div>
    </div>
  )
}
