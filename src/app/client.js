/* global data */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './index'

ReactDOM.render(<BrowserRouter
  basename='/app'
>
  <App {...data} />
</BrowserRouter>, document.getElementById('app'))
