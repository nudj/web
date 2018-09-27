const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const RandomHover = require('../../components/random-hover')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

const ApplicationComplete = (props) => {
  const pageTitle = 'Congratulations, you\'ve applied for a job on nudj!'
  const pageDescription = 'Someone from our team is now reviewing your profile and will get back to you shortly. We\'ve also sent you an email confirming your application.'

  const style = getStyle()

  return (<Page {...props} className={style.bodyContainer}>
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
    <Message message={get(props, 'message')} />
    <Header location={props.location.pathname} />
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.formHeaderSuccess}>
          <h1 className={style.title}>Nice one, you&apos;ve applied!</h1>
          <p className={style.subtitle}>
            We&apos;re now taking a quick look at your profile to check that it
            matches what the company is looking for (read more about why we do this{' '}
            <a
              href='http://help.nudj.co/the-nudj-platform/for-people-looking-for-jobs-and-referring-friends/what-happens-after-i-apply'
              className={style.link}
            >
              here
            </a>).
          </p>
          <p className={style.subtitle}>
            In the meantime if you have a question our team are on hand to
            answer, so just hit the button below to speak to an actual
            human being!
          </p>
          <p className={style.subtitle}>
            <RandomHover>
              <a
                href='mailto:help@nudj.co'
                id='open-intercom'
                className={style.button}
              >
                Ask us a question
              </a>
            </RandomHover>
          </p>
          <img
            className={style.thumbsUp}
            src='/assets/images/thumbs-up.svg'
            alt='Thumbs up'
          />
        </div>
      </div>
    </div>
  </Page>)
}

module.exports = ApplicationComplete
