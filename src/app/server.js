import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from './index'

export default (data) => ReactDOMServer.renderToString(<App {...data} />)
