import React from 'react'

import getStyle from './error-page.css'
import PageNotFound from '../404-page'
import ServerError from '../500-page'

export default (props) => {
  const style = getStyle()
  let html
  if (props.code === 404) {
    html = <PageNotFound />
  } else {
    html = <ServerError />
  }
  return (
    <div className={style.body}>
      {html}
    </div>
  )
}
