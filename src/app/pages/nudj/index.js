const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  InputField,
  Input,
  Button,
  Checkbox,
  Link
} = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const style = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')
const NudjSuccess = require('../../components/nudj-success')

const NudjComplete = props => {
  const company = get(props, 'company', {})
  const job = get(company, 'job', {})
  const pageTitle = `Congratulations, you've nudj'ed a job!`
  const socialTitle = `I'm trying to find a ${job.title} for ${company.name}. Can you help?`
  const pageDescription = `There is a bonus of ${job.bonus} up for grabs if anyone you refer gets the job.`

  return (
    <Page {...props}>
      <Message message={get(props, 'message')} />
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
        <meta name='title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={socialTitle} />
        <meta property='og:site_name' content='nudj' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={socialTitle} />
        <meta name='twitter:description' content={pageDescription} />
      </Helmet>
      <Header location={props.location.pathname} />
      <div className={css(style.page)}>
        <div className={css(style.box)}>
          <h1 className={css(style.heading)}>We&apos;ve created a unique link for you. Now share it!</h1>
          <p className={css(style.subtitle)}>This link will ensure that you get rewarded should anyone you refer get the job. Not sure how to share it? Check out our handy guide <a href='https://help.nudj.co/referring-a-friend-for-a-job-on-nudj/sharing-your-unique-link' className={css(style.link)}>here</a>.</p>
          <p className={css(style.subtitle)}>We&apos;ve also emailed you the link should you want to share it again.</p>
          <div className={css(style.success)}>
            <NudjSuccess {...props} />
          </div>
          <div className={css(style.tip)}>
            <h2 className={css(style.tipTitle)}>Here&apos;s a little tip</h2>
            <p className={css(style.tipBody)}>Don&apos;t over think it. Just send it straight to any of your friends that you think might be interested - they&apos;ll appreciate you thinking of them.</p>
          </div>
        </div>
      </div>
    </Page>
  )
}

class NudjPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
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
    const {
      company: {
        name: companyName,
        job: {
          referral
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

    // User has just submitted form
    if (referral) return <NudjComplete {...this.props} />

    const { firstName, lastName, email, acceptedTerms } = this.state

    const jobUrl = `/companies/${companySlug}/jobs/${jobSlug}`
    const pageTitle = 'Complete your referral'
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
        <div className={css(style.body)}>
          <div className={css(style.content)}>
            <div className={css(style.formHeader)}>
              <h1 className={css(style.title)}>
                Get your own referral link to ensure you get rewarded if your friend gets hired.
              </h1>
            </div>
          </div>
        </div>
        <div className={css(style.formSection)}>
          <form
            method='POST'
            action={`${jobUrl}/nudj`}
            className={css(style.form)}
          >
            <input type='hidden' name='_csrf' value={csrfToken} />
            <input type='hidden' name='referralId' value={referralId} />
            <InputField
              styleSheet={{
                root: style.inputField,
                label: style.inputFieldLabel,
                description: style.inputFieldDescription
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
                root: style.inputField,
                label: style.inputFieldLabel,
                description: style.inputFieldDescription
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
                root: style.inputField,
                label: style.inputFieldLabel,
                description: style.inputFieldDescription
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
            <Checkbox
              id='acceptedTerms'
              name='acceptedTerms'
              onChange={this.toggleCheckbox}
              checked={acceptedTerms}
              styleSheet={{ wrapper: mss.mtReg }}
              required
              label={(
                <span>
                  By providing the above details to us you agree to nudj's{' '}
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
            <div className={css(style.buttonContainer)}>
              <Button
                style={mss.mtLgIi}
                volume='cheer'
                type='submit'
              >
                Get referral link
              </Button>
            </div>
          </form>
        </div>
      </Page>
    )
  }
}

module.exports = NudjPage
