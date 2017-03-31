import React from 'react'
import get from 'lodash/get'

// import style from './error-page.css'

export default (props) => <div>{get(props, 'error.code')} - {get(props, 'error.message')}</div>
