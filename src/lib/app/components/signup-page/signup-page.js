import React from 'react'
import style from './signup-page.css'

export default (props) => {
  let html
  if (props.success) {
    html = (
      <div className={style.content}>
        <img src='https://media.giphy.com/media/26ufmAlKt4ne2JDnq/giphy.gif' width='320' height='320' />
        <p className={style.successHeader}>Nice one!</p>
        <p className={style.successCopy}>Someone from our team will be in touch shortly.</p>
      </div>
    )
  } else {
    html = (
      <form className={style.content} action='/request' method='post'>
        <div className={style.formHeader}>
          <h2 className={style.title}>Great jobs come to those who... nudj</h2>
          <p className={style.subtitle}>Just enter your details below and we'll get back to you as soon as possible.</p>
        </div>
        <fieldset className={style.fieldSet} id='sign_up'>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='first_name'>First Name</label>
            <input className={style.fieldInput} id='first_name' name='first_name' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='last_name'>Last Name</label>
            <input className={style.fieldInput} id='last_name' name='last_name' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='email_address'>Email</label>
            <input className={style.fieldInput} id='email' name='email' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='job_title'>Job Title</label>
            <input className={style.fieldInput} id='job_title' name='job_title' type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='job_title'>Role</label>
            <small>Tell us what you do day-to-day - select as many as you like!</small>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='development'><input className={style.checkboxInput} type='checkbox' id='development' value='development' name='development' />Development</label>
            </div>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='design'><input className={style.checkboxInput} type='checkbox' id='design' value='design' />Design</label>
            </div>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='marketing'><input className={style.checkboxInput} type='checkbox' id='marketing' value='marketing' />Marketing</label>
            </div>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='sales'><input className={style.checkboxInput} type='checkbox' id='sales' value='sales' />Sales</label>
            </div>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='product'><input className={style.checkboxInput} type='checkbox' id='product' value='product' />Product</label>
            </div>
            <div className={style.checkbox}>
              <label className={style.checkboxLabel} for='other'><input className={style.checkboxInput} type='checkbox' id='other' value='other' />Other</label>
            </div>
          </div>
        </fieldset>
        <input className={style.fieldSubmit} type='submit' value='Request access' />
      </form>
    )
  }
  return (
    <div className={style.body}>
      {html}
    </div>
  )
}
