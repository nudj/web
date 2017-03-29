import React from 'react'

// import style from './error-page.css'

export default ({ error }) => <div>{error.code} - {error.message}</div>
