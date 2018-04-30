const React = require('react')
const get = require('lodash/get')
const { Checkbox, Button } = require('@nudj/components')

const { getLegacyStyles, styleSheet } = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

class Request extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
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
    const { privacy, contact } = this.state
    const formIsValid = contact && privacy
    const style = getLegacyStyles()
    let html
    if (get(this.props, 'requestAccess.success')) {
      html = (
        <div className={style.content}>
          <div className={style.formHeader}>
            <h1 className={style.title}>Nice one!</h1>
            <p className={style.subtitle}>Someone from our team will be in touch shortly to arrange a demo.</p>
            <img className={style.okHand} src='/assets/images/ok-hand.svg' alt='Ok' />
          </div>
        </div>
      )
    } else {
      html = (
        <form className={style.content} action='/request' method='post'>
          <input type='hidden' name='_csrf' value={this.props.csrfToken} />
          <div className={style.formHeader}>
            <h1 className={style.title}>Discover how nudj can help you hire better</h1>
            <p className={style.subtitle}>Just enter your details below and we&apos;ll get back to arrange a demo as soon as possible.</p>
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
                <label className={style.fieldLabel} htmlFor='company_name'>Company</label>
                <input
                  className={[
                    style.fieldInput,
                    'fs-hide'
                  ].join(' ')}
                  id='company_name'
                  name='company_name'
                  required
                  type='text'
                />
              </div>
              <div className={style.terms}>
                <label className={style.fieldLabel}>Terms, privacy and contact preferences</label>
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
                      I&apos;m happy for nudj to contact me.
                    </span>
                  }
                />
              </div>
            </div>
            <div className={style.fieldButtons}>
              <Button
                id='requestAccess'
                type='submit'
                volume='cheer'
                disabled={!formIsValid}
              >
               Send information
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

module.exports = Request
