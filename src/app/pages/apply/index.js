const React = require('react')
const { Helmet } = require('react-helmet')

const {
  InputField,
  Input,
  Button,
  Checkbox,
  Link
} = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const { styleSheet, getLegacyStyles } = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')
const RandomHoverButton = require('../../components/random-hover-button')

const ApplicationComplete = (props) => {
  const pageTitle = 'Congratulations, you\'ve applied for a job on nudj!'
  const pageDescription = 'Someone from our team is now reviewing your profile and will get back to you shortly. We\'ve also sent you an email confirming your application.'

  return (
    <Page {...props} className={css(styleSheet.bodyContainer)}>
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
      <Message message={props.message} />
      <Header location={props.location.pathname} />
      <div className={css(styleSheet.body)}>
        <div className={css(styleSheet.content)}>
          <div className={css(styleSheet.formHeaderSuccess)}>
            <h1 className={css(styleSheet.title)}>Nice one, you&apos;ve applied!</h1>
            <p className={css(styleSheet.subtitle)}>
              We&apos;re now taking a quick look at your profile to check that it
              matches what the company is looking for (read more about why we do this{' '}
              <a
                href='http://help.nudj.co/the-nudj-platform/for-people-looking-for-jobs-and-referring-friends/what-happens-after-i-apply'
                className={css(styleSheet.link)}
              >
                here
              </a>).
            </p>
            <p className={css(styleSheet.subtitle)}>
              In the meantime if you have a question our team are on hand to
              answer, so just hit the button below to speak to an actual
              human being!
            </p>
            <p className={css(styleSheet.subtitle)}>
              <RandomHoverButton
                href='mailto:help@nudj.co'
                id='open-intercom'
                style={styleSheet.button}
              >
                Ask us a question
              </RandomHoverButton>
            </p>
            <img
              className={css(styleSheet.thumbsUp)}
              src='/assets/images/thumbs-up.svg'
              alt='Thumbs up'
            />
          </div>
        </div>
      </div>
    </Page>
  )
}

class ApplicationUpdate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      profileUrl: '',
      acceptedTerms: false
    }
  }

  toggleCheckbox = event => {
    const { acceptedTerms } = this.state

    this.setState({
      [event.name]: !acceptedTerms
    })
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
          title: jobTitle,
          application
        }
      },
      match: {
        params: {
          companySlug,
          jobSlug
        }
      },
      url: {
        query: {
          referralId
        }
      },
      csrfToken
    } = this.props

    // User has just applied with a post request
    if (application) return <ApplicationComplete {...this.props} />

    const { firstName, lastName, email, url, acceptedTerms } = this.state

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
        <Header location={this.props.location.pathname} />
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
            action={`${jobUrl}/apply`}
            className={style.form}
          >
            <input type='hidden' name='_csrf' value={csrfToken} />
            <input type='hidden' name='referralId' value={referralId} />
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
            <Checkbox
              id='acceptedTerms'
              name='acceptedTerms'
              onChange={this.toggleCheckbox}
              checked={acceptedTerms}
              value={acceptedTerms}
              styleSheet={{ wrapper: mss.mtReg }}
              required
              label={(
                <span>
                  By applying you agree to nudj's{' '}
                  <Link style={mss.pa0} volume='cheer' subtle href='https://help.nudj.co/pricing-privacy-and-terms/nudj-terms-of-service-eula'>
                    terms of service
                  </Link>
                  {' and '}
                  <Link style={mss.pa0} volume='cheer' subtle href='https://help.nudj.co/pricing-privacy-and-terms/nudj-privacy-policy'>
                    privacy policy
                  </Link>.
                </span>
              )}
            />
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
