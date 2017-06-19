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
      <div className={style.link}>
        <div className={style.linkContainer}>{link}</div>
        <button id='copy' className={style.copyLink} data-clipboard-text={link}>Copy link</button>
      </div>
    </div>
  )
}
