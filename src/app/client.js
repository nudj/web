import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './index'

export default (data) => ReactDOM.render(<BrowserRouter
  basename='/app'
>
  <App {...data} />
</BrowserRouter>, document.getElementById('app'))
