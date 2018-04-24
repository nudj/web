const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  InputField,
  Input,
  Button
} = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { styleSheet, getLegacyStyles } = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

class ApplicationUpdate extends React.Component {
  constructor (props) {
    super(props)

    const { user } = props.app

    this.state = {
      role: get(user, 'role.name', ''),
      company: get(user, 'company.name', ''),
      url: user.url || ''
    }
  }

  handleInputChange = ({ name, value }) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    const pageTitle = 'Congratulations, you\'ve applied for a job on nudj!'
    const pageDescription = 'Someone from our team is now reviewing your profile and will get back to you shortly. We\'ve also sent you an email confirming your application.'

    const style = getLegacyStyles()

    const {
      app: {
        company: {
          name: companyName
        },
        message
      },
      match: {
        params: {
          companySlug,
          jobId
        }
      },
      csrfToken
    } = this.props

    const { role, company, url } = this.state

    const jobUrl = `/companies/${companySlug}/jobs/${jobId}`

    return (
      <Page {...this.props}>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name='description' content={pageDescription} />
          <meta name='title' content={pageTitle} />
          <meta property='og:description' content={pageDescription} />
          <meta property='twitter:description' content={pageDescription} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={pageTitle} />
          <meta property='twitter:card' content={pageTitle} />
          <meta property='twitter:title' content={pageTitle} />
          <meta property='og:site_name' content='nudj' />
        </Helmet>
        <Message message={message} />
        <Header />
        <div className={style.body}>
          <div className={style.content}>
            <div className={style.formHeader}>
              <h1 className={style.title}>Tell us a bit more about yourself</h1>
              <p className={style.subtitle}>
                So the folks at {companyName} can get a better idea of who you are
                and what you&apos;ve done, we&apos;d like to get a few more details from you.
              </p>
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
              htmlFor='role'
              label='Current job title'
            >
              <Input
                id='role'
                name='role'
                placeholder='e.g., Marketing Executive'
                value={role}
                onChange={this.handleInputChange}
              />
            </InputField>
            <InputField
              styleSheet={{
                root: styleSheet.inputField,
                label: styleSheet.inputFieldLabel,
                description: styleSheet.inputFieldDescription
              }}
              htmlFor='company'
              label='Current employer'
            >
              <Input
                id='company'
                name='company'
                placeholder='e.g., Apple'
                value={company}
                onChange={this.handleInputChange}
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
              description='e.g., your LinkedIn profile or your personal website'
            >
              <Input
                id='url'
                name='url'
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
