import React from 'react'
import style from './request-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.hero}>
      <div className={style.heroBody}>
        <form className={style.request} action='/request' method='post'>
          <div className={style.formHeader}>
            <h2 className={style.title}>Good things come to those who... Nudj</h2>
            <p className={style.subtitle}>Just enter your details below and we'll get back to you asap.</p>
          </div>
          <fieldset className={style.fieldSet} id='sign_up'>
            <div className={style.fieldWrap}>
              <label className={style.fieldLabel} for='fullname'>Full Name</label>
              <input className={style.fieldInput} id='fullname' name='fullname' required type='text' />
            </div>
            <div className={style.fieldWrap}>
              <label className={style.fieldLabel} for='email_address'>Email</label>
              <input className={style.fieldInput} id='email' name='email' required type='text' />
            </div>
            <div className={style.fieldWrap}>
              <label className={style.fieldLabel} for='company'>Company</label>
              <input className={style.fieldInput} id='company_name' name='company_name' type='text' />
            </div>
          </fieldset>
          <input className={style.fieldSubmit} type='submit' value='Request access' />
        </form>
      </div>
    </div>
  </div>
)
