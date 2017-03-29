import React from 'react'
import get from 'lodash/get'
// import style from './nudj-success.css'

export default (props) => {
  return (
    <div>
      <p>Awesomesauce! Here's your special link...</p>
      <a href={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}+${get(props, 'referral.id')}`}>{`http://nudj.co/${get(props, 'company.slug')}/${get(props, 'job.slug')}+${get(props, 'referral.id')}`}</a>
    </div>
  )
}
