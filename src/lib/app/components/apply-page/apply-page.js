import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import getStyle from './apply-page.css'

class Component extends React.Component {
  constructor (props) {
    super(props)

    const form = props.form
    const person = props.person

    this.state = {form, person}
    this.style = getStyle()
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
    const styleWrapperClass = this.style[wrapperClass]
    const renderValue = this.state[id] || value || ''
    return (
      <div className={styleWrapperClass}>
        <label className={this.style.fieldLabel} htmlFor={id}>{label}</label>
        <input className={state.invalid ? this.style.invalidInput : this.style.fieldInput}
          id={id} name={id} type={type}
          required={!!required} disabled={!!disabled}
          value={renderValue}
          onChange={this.handleFieldChange.bind(this)} />
      </div>
    )
  }

  renderSuccess () {
    return (
      <div className={this.style.content}>
        <div className={this.style.formHeaderSuccess}>
          <h1 className={this.style.title}>Great job, you've applied!</h1>
          <p className={this.style.subtitle}>Someone from our team will be in touch shortly. In the meantime, sit back, relax and give yourself a pat on the back.</p>
          <p className={this.style.subtitle}>If you'd like to hear about other awesome jobs on our platform then <a href='' className={this.style.link} id='open-intercom'>get in touch</a>.</p>
          <img className={this.style.thumbsUp} src='/assets/images/thumbs-up.svg' alt='Thumbs up' />
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
      <form className={this.style.content} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <div className={this.style.formHeader}>
          <h1 className={this.style.title}>Complete your application for <span className={this.style.jobTitle}>{this.props.job.title}</span> @ <span className={this.style.companyName}>{this.props.company.name}</span></h1>
        </div>
        <fieldset className={this.style.fieldSet} id='apply'>
          <div className={this.style.fieldWrapContainer}>
            {firstName}
            {lastName}
            {email}
            {url}
          </div>
          <div className={this.style.fieldButtons}>
            <input className={this.style.fieldSubmit} type='submit' value='Apply' />
          </div>
        </fieldset>
      </form>
    )
  }

  render () {
    this.style = getStyle()
    return (
      <div className={this.style.body}>
        {this.isProfileComplete() ? this.renderSuccess() : this.renderForm()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
