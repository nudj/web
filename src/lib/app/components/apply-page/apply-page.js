import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './apply-page.css'

function renderField ({
  id,
  label,
  invalidMessage,
  required,
  value,
  disabled
}, state) {
  return (
    <div className={style.field}>
      <label className={style.fieldLabel} htmlFor={id}>{label}</label>
      <input className={state.invalid ? style.invalidInput : style.fieldInput} id={id} name={id} required={!!required} disabled={!!disabled} value={(state && state.value) || value || ''} />
    </div>
  )
}

function renderSuccess (props) {
  return (
    <div className={style.successBox}>
      <img src='https://media.giphy.com/media/l2Sqir5ZxfoS27EvS/giphy.gif' width='320' height='320' />
      <h1 className={style.heading}>Great job, you've applied!</h1>
      <p className={style.copy}>Someone from our team will be in touch shortly. In the meantime, sit back, relax and give yourself a pat on the back.</p>
      <p className={style.copy}>If you'd like to hear about other awesome jobs on our platform then <Link to='' className={style.link} id='open-intercom'>get in touch</Link>.</p>
    </div>
  )
}

function renderForm (props) {
  return (
    <form className={style.form} method='POST'>
      <input type='hidden' name='_csrf' value={props.csrfToken} />
      <div className={style.formHeader}>
        <h1 className={style.title}>Complete your application for <span className={style.bold}>{get(props, 'job.title')}</span> @ <span className={style.bold}>{get(props, 'company.name')}</span></h1>
      </div>
      {renderField({
        id: 'firstName',
        label: 'First name',
        invalidMessage: 'Please enter a valid first name',
        required: true,
        value: get(props, 'person.firstName')
      }, get(props, 'form.firstName'))}
      {renderField({
        id: 'lastName',
        label: 'Last name',
        invalidMessage: 'Please enter a valid last name',
        required: true,
        value: get(props, 'person.lastName')
      }, get(props, 'form.lastName'))}
      {renderField({
        id: 'email',
        label: 'Email',
        invalidMessage: 'Please enter a valid email',
        required: true,
        value: get(props, 'person.email'),
        disabled: true
      }, get(props, 'form.email'))}
      {renderField({
        id: 'url',
        label: 'Add Profile URL - e.g. a link to your LinkedIn or Github profile.',
        invalidMessage: 'Please enter a valid profile url',
        required: true,
        value: get(props, 'person.url')
      }, get(props, 'form.url'))}
      <p className={style.field}>
        <button className={style.submit}>Apply</button>
      </p>
    </form>
  )
}

function isProfileComplete (person) {
  return person.firstName && person.lastName && person.url
}

const Component = (props) => {
  return (
    <div className={style.page}>
      {isProfileComplete(props.person) ? renderSuccess(props) : renderForm(props)}
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
