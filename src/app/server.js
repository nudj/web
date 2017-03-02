import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from './index'

export default ReactDOMServer.renderToString(<App />)
