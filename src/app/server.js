import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/index'
import { appReducer } from './reducers/app'

export default (data, url) => {
  const store = createStore(appReducer, data)
  const context = {}
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        basename='/app'
        location={url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  )
  return context.url ? context : html
}
