import React from 'react'
import get from 'lodash/get'
import NudjSuccess from '../nudj-success'

// import style from './nudj-success.css'

export default (props) => {
  return (
    <div>
      <NudjSuccess {...props.page} />
    </div>
  )
}
