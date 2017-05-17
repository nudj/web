import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Helmet } from 'react-helmet'
import { StyleSheetServer } from 'aphrodite/no-important'

import { pageReducer } from './reducers/page'

export default (data) => {
  const store = createStore(
    combineReducers({
      page: pageReducer
    }),
    data
  )
  const context = {}
  const { html, css } = StyleSheetServer.renderStatic(() => {
    const App = require('./components/index').default
    return ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={data.page.url.originalUrl}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    )
  })
  context.html = html
  context.css = css
  context.helmet = Helmet.renderStatic()
  return context
}
