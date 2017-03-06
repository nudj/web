import React from 'react'
import ReactDOM from 'react-dom'

import App from './index'

export default (data) => ReactDOM.render(<App {...data} />, document.getElementById('app'))
