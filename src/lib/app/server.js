import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import App from './components/index'
import { userReducer } from './reducers/user'
import { messageReducer } from './reducers/message'
import { pageReducer } from './reducers/page'

export default (data, url) => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      page: pageReducer,
      message: messageReducer
    }),
    data
  )
  const context = {}
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  )
  return context.url ? context : html
}
