import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './apply-page.css'

class Component extends React.Component {
  constructor (props) {
    super(props)

    const form = props.form
    const person = props.person

    this.state = {form, person}
  }

  handleFieldChange (event) {
    const value = event.target.value
    const id = event.target.id

    let state = []
    state[id] = value

    this.setState(state)
  }

  isProfileComplete () {
    return this.state.person && this.state.person.firstName && this.state.person.lastName && this.state.person.url
  }

  renderField ({id, label, type, invalidMessage, required, value, disabled = false, wrapperClass = 'fieldWrap'}, state) {
    const styleWrapperClass = style[wrapperClass]
    const renderValue = this.state[id] || value || ''
    return (
      <div className={styleWrapperClass}>
        <label className={style.fieldLabel} htmlFor={id}>{label}</label>
        <input className={state.invalid ? style.invalidInput : style.fieldInput}
          id={id} name={id} type={type}
          required={!!required} disabled={!!disabled}
          value={renderValue}
          onChange={this.handleFieldChange.bind(this)} />
      </div>
    )
  }

  renderSuccess () {
    return (
      <div className={style.content}>
        <div className={style.formHeader}>
          <img className={style.fingersCrossed} src='/assets/images/fingers-crossed.svg' alt='Fingers crossed' />
          <h1 className={style.title}>Great job, you've applied!</h1>
          <p className={style.subtitle}>Someone from our team will be in touch shortly. In the meantime, sit back, relax and give yourself a pat on the back.</p>
          <p className={style.subtitle}>If you'd like to hear about other awesome jobs on our platform then <Link to='' className={style.link} id='open-intercom'>get in touch</Link>.</p>
          <img className={style.thumbsUp} src='/assets/images/thumbs-up.svg' alt='Thumbs up' />
        </div>
      </div>
    )
  }

  renderForm () {
    const firstName = this.renderField(
      {
        id: 'firstName',
        label: 'First name',
        type: 'text',
        invalidMessage: 'Please enter a valid first name',
        required: true,
        value: this.state.person.firstName,
        wrapperClass: 'fieldWrapShortOdd'
      }, this.state.form.firstName)

    const lastName = this.renderField({
      id: 'lastName',
      label: 'Last name',
      type: 'text',
      invalidMessage: 'Please enter a valid last name',
      required: true,
      value: this.state.person.lastName,
      wrapperClass: 'fieldWrapShortEven'
    }, this.state.form.lastName)

    const email = this.renderField({
      id: 'email',
      label: 'Email',
      type: 'email',
      invalidMessage: 'Please enter a valid email',
      required: true,
      value: this.state.person.email,
      disabled: true
    }, this.state.form.email)

    const url = this.renderField({
      id: 'url',
      label: 'Add Profile URL - e.g. a link to your LinkedIn or Github profile.',
      type: 'url',
      invalidMessage: 'Please enter a valid profile url',
      required: true,
      value: this.state.person.url
    }, this.state.form.url)

    return (
      <form className={style.content} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <div className={style.formHeader}>
          <h1 className={style.title}>Complete your application for <span className={style.jobTitle}>{this.props.job.title}</span> @ <span className={style.companyName}>{this.props.company.name}</span></h1>
        </div>
        <fieldset className={style.fieldSet} id='apply'>
          <div className={style.fieldWrapContainer}>
            {firstName}
            {lastName}
            {email}
            {url}
          </div>
          <div className={style.fieldButtons}>
            <input className={style.fieldSubmit} type='submit' value='Apply' />
          </div>
        </fieldset>
      </form>
    )
  }

  render () {
    return (
      <div className={style.body}>
        {this.isProfileComplete() ? this.renderSuccess() : this.renderForm()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
