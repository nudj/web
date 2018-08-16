const React = require('react')
const { Helmet } = require('react-helmet')

const {
  InputField,
  Input,
  Button
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { styleSheet, getLegacyStyles } = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')

class ApplicationUpdate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      profileUrl: ''
    }
  }

  handleInputChange = ({ name, value }) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    const style = getLegacyStyles()

    const {
      company: {
        name: companyName,
        job: {
          title: jobTitle
        }
      },
      match: {
        params: {
          companySlug,
          jobSlug
        }
      },
      csrfToken
    } = this.props

    const { firstName, lastName, email, url } = this.state

    const jobUrl = `/companies/${companySlug}/jobs/${jobSlug}`

    const pageTitle = 'Complete your application'
    const pageDescription = `Before sharing your profile with the team at ${companyName}, we just need a few more details from you.`

    return (
      <Page {...this.props}>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name='description' content={pageDescription} />
          <meta name='title' content={pageTitle} />
          <meta property='og:description' content={pageDescription} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={pageTitle} />
          <meta property='og:site_name' content='nudj' />
          <meta name='twitter:description' content={pageDescription} />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content={pageTitle} />
        </Helmet>
        <Header />
        <div className={style.body}>
          <div className={style.content}>
            <div className={style.formHeader}>
              <h1 className={style.title}>
                Your application to be a{' '}
                <span className={css(mss.fgMidRed)}>{jobTitle}</span> with{' '}
                <span className={css(mss.fgMidRed)}>{companyName}</span>.
              </h1>
            </div>
          </div>
        </div>
        <div className={style.formSection}>
          <form
            method='POST'
            action={`${jobUrl}/apply/complete`}
            className={style.form}
          >
            <input type='hidden' name='_csrf' value={csrfToken} />
            <InputField
              styleSheet={{
                root: styleSheet.inputField,
                label: styleSheet.inputFieldLabel,
                description: styleSheet.inputFieldDescription
              }}
              htmlFor='firstName'
              label='First name'
              required
            >
              <Input
                id='firstName'
                name='firstName'
                type='text'
                placeholder='Buzz'
                value={firstName}
                onChange={this.handleInputChange}
                required
              />
            </InputField>
            <InputField
              styleSheet={{
                root: styleSheet.inputField,
                label: styleSheet.inputFieldLabel,
                description: styleSheet.inputFieldDescription
              }}
              htmlFor='lastName'
              label='Last name'
              required
            >
              <Input
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Lightyear'
                value={lastName}
                onChange={this.handleInputChange}
                required
              />
            </InputField>
            <InputField
              styleSheet={{
                root: styleSheet.inputField,
                label: styleSheet.inputFieldLabel,
                description: styleSheet.inputFieldDescription
              }}
              htmlFor='email'
              label='Email address'
              required
            >
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='buzz.lightyear@starcommand.tld'
                value={email}
                onChange={this.handleInputChange}
                required
              />
            </InputField>
            <InputField
              styleSheet={{
                root: styleSheet.inputField,
                label: styleSheet.inputFieldLabel,
                description: styleSheet.inputFieldDescription
              }}
              htmlFor='url'
              label='Profile URL'
              description='Add your LinkedIn profile or online portfolio'
            >
              <Input
                id='url'
                name='url'
                type='url'
                placeholder='https://linkedin.com/in/profile'
                value={url}
                onChange={this.handleInputChange}
              />
            </InputField>
            <div className={style.buttonContainer}>
              <Button
                style={mss.mtLgIi}
                volume='cheer'
                type='submit'
              >
                Submit application
              </Button>
            </div>
          </form>
        </div>
      </Page>
    )
  }
}

module.exports = ApplicationUpdate
