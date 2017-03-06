import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './index'

export default (data, url) => {
  const context = {}
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      basename='/app'
      location={url}
      context={context}
    >
      <App {...data} />
    </StaticRouter>
  )
  return context.url ? context : html
}
