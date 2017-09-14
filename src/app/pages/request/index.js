const React = require('react')
const getStyle = require('./style.css')
const get = require('lodash/get')

const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')
const RandomHover = require('../../components/random-hover')

const Request = (props) => {
  const style = getStyle()
  let html
  if (props.success) {
    html = (
      <div className={style.content}>
        <div className={style.formHeader}>
          <h1 className={style.title}>Nice one!</h1>
          <p className={style.subtitle}>Someone from our team will be in touch shortly.</p>
          <img className={style.okHand} src='/assets/images/ok-hand.svg' alt='Ok' />
        </div>
      </div>
    )
  } else {
    html = (
      <form className={style.content} action='/request' method='post'>
        <input type='hidden' name='_csrf' value={props.csrfToken} />
        <div className={style.formHeader}>
          <h1 className={style.title}>Great jobs come to those who... nudj</h1>
          <p className={style.subtitle}>Just enter your details below and we'll get back to you as soon as possible.</p>
        </div>
        <fieldset className={style.fieldSet} id='sign_up'>
          <div className={style.fieldWrapContainer}>
            <div className={style.fieldWrapShortOdd}>
              <label className={style.fieldLabel} htmlFor='first_name'>First Name</label>
              <input className={style.fieldInput} id='first_name' name='first_name' required type='text' />
            </div>
            <div className={style.fieldWrapShortEven}>
              <label className={style.fieldLabel} htmlFor='last_name'>Last Name</label>
              <input className={style.fieldInput} id='last_name' name='last_name' required type='text' />
            </div>
            <div className={style.fieldWrap}>
              <label className={style.fieldLabel} htmlFor='email_address'>Email</label>
              <input className={style.fieldInput} id='email' name='email' required type='text' />
            </div>
            <div className={style.fieldWrap}>
              <label className={style.fieldLabel} htmlFor='company_name'>Company</label>
              <input className={style.fieldInput} id='company_name' name='company_name' type='text' />
            </div>
          </div>
          <div className={style.fieldButtons}>
            <RandomHover><input className={style.fieldSubmit} type='submit' value='Request access' /></RandomHover>
          </div>
        </fieldset>
      </form>
    )
  }
  return (<Page {...props} className={style.bodyContainer}>
    <Message message={get(props, 'message')} />
    <Header />
    <div className={style.body}>
      {html}
    </div>
  </Page>)
}

module.exports = Request
