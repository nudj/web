/* global data, cssRenderedClassNames */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { StyleSheet } from 'aphrodite'

import App from './components/index'
import { pageReducer } from './reducers/page'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    page: pageReducer,
    router: routerReducer
  }),
  data,
  applyMiddleware(middleware)
)

StyleSheet.rehydrate(cssRenderedClassNames)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
