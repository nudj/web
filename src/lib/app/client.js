/* global data */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/index'
import { appReducer } from './reducers/app'

const store = createStore(appReducer, data)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/app'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
