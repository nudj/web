const React = require('react')
const get = require('lodash/get')
const { Checkbox, Button } = require('@nudj/components')

const { getLegacyStyles, styleSheet } = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

class SignUp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      terms: false,
      privacy: false,
      contact: false
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }
  handleCheckboxChange (event) {
    const { name, checked } = event
    this.setState({ [name]: checked })
  }
  render () {
    const style = getLegacyStyles()
    const { terms, privacy, contact } = this.state
    const formIsValid = contact && privacy && terms
    let html
    if (get(this.props, 'signUp.success')) {
      html = (
        <div className={style.content}>
          <div className={style.formHeader}>
            <h1 className={style.title}>Nice one!</h1>
            <p className={style.subtitle}>Someone from our team will be in touch shortly.</p>
            <p className={style.subtitle}>In the meantime, if you have any questions then <a href='mailto:hello@nudj.co' id='open-intercom' className={style.link}>get in touch</a>.</p>
            <img className={style.okHand} src='/assets/images/ok-hand.svg' alt='Ok' />
          </div>
        </div>
      )
    } else {
      html = (
        <form className={style.content} action='/signup' method='post'>
          <input type='hidden' name='_csrf' value={this.props.csrfToken} />
          <div className={style.formHeader}>
            <h1 className={style.title}>Great jobs come to those who nudj</h1>
            <p className={style.subtitle}>Just enter your details below and we&apos;ll get back to you as soon as possible.</p>
          </div>
          <fieldset className={style.fieldSet} id='sign_up'>
            <div className={style.fieldWrapContainer}>
              <div className={style.fieldWrapShortOdd}>
                <label className={style.fieldLabel} htmlFor='first_name'>First Name</label>
                <input
                  className={[
                    style.fieldInput,
                    'fs-hide'
                  ].join(' ')}
                  id='first_name'
                  name='first_name'
                  required
                  type='text'
                />
              </div>
              <div className={style.fieldWrapShortEven}>
                <label className={style.fieldLabel} htmlFor='last_name'>Last Name</label>
                <input
                  className={[
                    style.fieldInput,
                    'fs-hide'
                  ].join(' ')}
                  id='last_name'
                  name='last_name'
                  required
                  type='text'
                />
              </div>
              <div className={style.fieldWrap}>
                <label className={style.fieldLabel} htmlFor='email_address'>Email</label>
                <input
                  className={[
                    style.fieldInput,
                    'fs-hide'
                  ].join(' ')}
                  id='email'
                  name='email'
                  required
                  type='email'
                />
              </div>
              <div className={style.fieldWrap}>
                <label className={style.fieldLabel} htmlFor='job_title'>Job Title</label>
                <input
                  className={[
                    style.fieldInput,
                    'fs-hide'
                  ].join(' ')}
                  id='job_title'
                  name='job_title'
                  type='text'
                />
              </div>
              <div className={style.fieldWrap}>
                <p className={style.helper}>Tell us what you do day-to-day</p>
                <ul className={[
                  style.radioList,
                  'fs-hide'
                ].join(' ')}
                >
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='development' value='development' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='development' />
                    <label className={style.radioLabel} htmlFor='development'>Development</label>
                  </li>
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='design' value='design' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='design' />
                    <label className={style.radioLabel} htmlFor='design'>Design</label>
                  </li>
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='marketing' value='marketing' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='marketing' />
                    <label className={style.radioLabel} htmlFor='marketing'>Marketing</label>
                  </li>
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='sales' value='sales' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='sales' />
                    <label className={style.radioLabel} htmlFor='sales'>Sales</label>
                  </li>
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='product' value='product' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='product' />
                    <label className={style.radioLabel} htmlFor='product'>Product</label>
                  </li>
                  <li className={style.radio}>
                    <input className={style.radioInput} type='radio' id='other' value='other' name='role' />
                    <label className={style.radioPrettyLabel} htmlFor='other' />
                    <label className={style.radioLabel} htmlFor='other'>Other</label>
                  </li>
                </ul>
              </div>
              <div className={style.terms}>
                <label className={style.fieldLabel}>Terms, privacy and contact preferences</label>
                <Checkbox
                  styleSheet={{
                    labelContainer: styleSheet.checkboxLabel
                  }}
                  checked={terms}
                  onChange={this.handleCheckboxChange}
                  id='terms'
                  name='terms'
                  value='terms'
                  label={
                    <span
                      className={style.termsLabel}
                    >
                      I&apos;ve read and agree to nudj's <a className={style.link} href='https://help.nudj.co/pricing-privacy-and-terms/nudj-terms-of-service-eula'>terms and conditions</a>.
                    </span>

                  }
                />
                <Checkbox
                  styleSheet={{
                    labelContainer: styleSheet.checkboxLabel
                  }}
                  checked={privacy}
                  onChange={this.handleCheckboxChange}
                  id='privacy'
                  name='privacy'
                  value='privacy'
                  label={
                    <span
                      className={style.termsLabel}
                    >
                      I understand how nudj handles my data as outlined in their <a className={style.link} href='https://help.nudj.co/pricing-privacy-and-terms/nudj-privacy-policy'>privacy policy</a>.
                    </span>
                  }
                />
                <Checkbox
                  styleSheet={{
                    labelContainer: styleSheet.checkboxLabel
                  }}
                  checked={contact}
                  onChange={this.handleCheckboxChange}
                  id='contact'
                  name='contact'
                  value='contact'
                  label={
                    <span
                      className={style.termsLabel}
                    >
                      I&apos;m happy for nudj to contact me about jobs that I or my friends might be interested in.
                    </span>
                  }
                />
              </div>
            </div>
            <div className={style.fieldButtons}>
              <Button
                type='submit'
                volume='cheer'
                disabled={!formIsValid}
              >
                Sign up
              </Button>
            </div>
          </fieldset>
        </form>
      )
    }
    return (<Page {...this.props} className={style.bodyContainer}>
      <Message message={get(this.props, 'message')} />
      <Header />
      <div className={style.body}>
        {html}
      </div>
    </Page>)
  }
}

module.exports = SignUp
