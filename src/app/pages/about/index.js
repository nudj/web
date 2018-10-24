const React = require('react')
const { Helmet } = require('react-helmet')

const { css } = require('@nudj/components/styles')
const style = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')
const RandomHoverButton = require('../../components/random-hover-button')

const About = (props) => {
  const pageTitle = `About nudj`
  const pageDescription = `We're on a mission to make referrals the only way to hire and get hired. Why? Because the best recuriter is not a recruiter, it's a person you know and trust.`

  return (
    <Page {...props} className={css(style.body)}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
        <meta name='title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:site_name' content='nudj' />
        <meta name='twitter:description' content={pageDescription} />
        <meta name='twitter:card' content={pageTitle} />
        <meta name='twitter:title' content={pageTitle} />
      </Helmet>
      <Header
        backgroundColour='navy'
        textColour='white'
        textHighlightColour='royalBlue'
        location={props.location.pathname}
      />
      <section className={css(style.hero)}>
        <div className={css(style.header)}>
          <AnimateAppearance from='bottom'>
            <h1 className={css(style.heroTitle)}>Hiring is broken. <br className={css(style.standardBreak)} />Referrals are the answer. <br className={css(style.standardBreak)} />All they need is a nudj.</h1>
          </AnimateAppearance>
        </div>
      </section>
      <section className={css(style.solution)}>
        <ul className={css(style.steps)}>
          <li className={css(style.stepReverse)}>
            <img className={css(style.stepImageReverse)} src='/assets/images/about-page/rubiks-cube.svg' alt='' />
            <div className={css(style.stepDescriptionReverse)}>
              <AnimateAppearance from='left'>
                <h2 className={css(style.stepTitle)}>Solving the hiring puzzle</h2>
                <p className={css(style.stepCopy)}>Hiring is time consuming, expensive and increasingly difficult.
                Whether you&apos;re a company trying to find and attract good people, or a person looking to take the next step in their career,
                 it&apos;s tough. <a href='https://qz.com/299923/why-job-referrals-matter/' className={css(style.red)}>Referrals are proven to help</a>.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={css(style.step)}>
            <img className={css(style.stepImage)} src='/assets/images/about-page/target.svg' alt='' />
            <div className={css(style.stepDescription)}>
              <AnimateAppearance from='right'>
                <h2 className={css(style.stepTitle)}>Finding the best people</h2>
                <p className={css(style.stepCopy)}>Recruiters, job boards and marketplaces only help companies reach those that are actively
                 looking for a job. Referrals, however, help get jobs in front of the best people, regardless of whether they&apos;re
                 looking or not.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={css(style.stepReverse)}>
            <img className={css(style.stepImageReverse)} src='/assets/images/about-page/white-board.svg' alt='' />
            <div className={css(style.stepDescriptionReverse)}>
              <AnimateAppearance from='left'>
                <h2 className={css(style.stepTitle)}>Getting them engaged</h2>
                <p className={css(style.stepCopy)}>For you to share a job with a friend, you need to know what role would interest
                 them. Likewise for a company, the team hiring is best positioned to know the type of person they need. All this ensures that come interview time
                 everyone is already commited.</p>
              </AnimateAppearance>
            </div>
          </li>
        </ul>
      </section>
      <section className={css(style.joinUs)}>
        <div className={css(style.header)}>
          <AnimateAppearance from='bottom'>
            <h2 className={css(style.bodyTitle)}><span className={css(style.compareUnderline)}>Join us</span></h2>
            <p className={css(style.bodySubtitle)}>We are not hiring at the moment, but we always like to hear from talented people.</p>
          </AnimateAppearance>
        </div>
        <AnimateAppearance from='bottom'>
          <div className={css(style.cta)}>
            <RandomHoverButton volume='cheer' href='mailto:hello@nudj.co?subject=Joining the nudj team' style={style.viewJobs} id='joinUs'>
              Email the team
            </RandomHoverButton>
          </div>
        </AnimateAppearance>
      </section>
    </Page>
  )
}

module.exports = About
