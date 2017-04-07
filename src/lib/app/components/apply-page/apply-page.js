import React from 'react'
import get from 'lodash/get'
import { Link } from 'react-router-dom'

import style from './apply-page.css'

function renderField ({
  id,
  label,
  required,
  value,
  disabled
}) {
  return (
    <p className={style.field}>
      <label className={style.fieldLabel} for={id}>{label}</label>
      <input className={style.fieldInput} id={id} name={id} required={!!required} disabled={!!disabled} value={value || ''} />
    </p>
  )
}

function renderSuccess (props) {
  return (
    <div className={style.successBox}>
      <iframe src='//giphy.com/embed/3oz8xsRKgCWlzkqT7y' width='480' height='270' frameBorder='0' className='giphy-embed' allowFullScreen />
      <p>Great job, you've applied!</p>
      <Link className={style.continue} to='/dashboard'>Continue to dashboard -></Link>
    </div>
  )
}

function renderForm (props) {
  console.log('person', props.person)
  return (
    <form className={style.form} method='POST'>
      <h1 className={style.title}>Apply for <strong>{get(props, 'job.title')}</strong> @ <strong>{get(props, 'company.name')}</strong> in <strong>{get(props, 'job.location')}</strong></h1>
      {renderField({ id: 'firstName', label: 'First name', required: true, value: get(props, 'person.firstName'), disabled: true })}
      {renderField({ id: 'lastName', label: 'Last name', required: true, value: get(props, 'person.lastName'), disabled: true })}
      {renderField({ id: 'email', label: 'Email', required: true, value: get(props, 'person.email'), disabled: true })}
      {renderField({ id: 'url', label: 'Add a profile URL', value: get(props, 'person.url') })}
      <p className={style.field}>
        <button className={style.submit}>Apply</button>
      </p>
    </form>
  )
}

export default (props) => {
  return (
    <div className={style.page}>
      {get(props, 'person.url') ? renderSuccess(props) : renderForm(props)}
    </div>
  )
}
