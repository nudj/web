const React = require('react')
const { Helmet } = require('react-helmet')
const TypeOut = require('react-typeout').default
const { css } = require('@nudj/components/styles')

const style = require('./style.css')
const Page = require('../../components/page')
const AnimateAppearance = require('../../components/animate-appearance')
const RandomHoverButton = require('../../components/random-hover-button')
const Header = require('../../components/header')

const words = [
  'designers',
  'product managers',
  'marketers',
  'sales people',
  'developers'
]

const Talent = (props) => {
  const pageTitle = 'nudj - Find your next job, approved by people you trust.'
  const pageDescription = 'Finding a job that you\'ll actually enjoy is hard. With nudj, your friends do the work for you, recommending you for roles they know you\'ll be interested in. No more recruiters. No more spam.'

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
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={pageTitle} />
      </Helmet>
      <div className={css(style.header)}>
        <Header location={props.location.pathname} />
      </div>
      <section className={css(style.hero)}>
        <ul className={css(style.story)}>
          <li className={css(style.notHappy)}>
            <div className={css(style.notHappyContainer)}>
              <AnimateAppearance from='bottom'>
                <h1 className={css(style.heroTitle)}>The best <TypeOut words={words} className={css(style.typeout)} pauseSpeed={5000} /> are always busy,<br className={css(style.oppositeBreak)} /> but they aren&apos;t always happy.</h1>
              </AnimateAppearance>
            </div>
          </li>
          <li className={css(style.unknown)}>
            <div className={css(style.unknownContainer)}>
              <AnimateAppearance from='right'><h1 className={css(style.unknownTitle)}>They&apos;re often hard to find and are unknown to most.</h1></AnimateAppearance>
            </div>
          </li>
          <li className={css(style.friends)}>
            <div className={css(style.friendsContainer)}>
              <AnimateAppearance from='left'><h1 className={css(style.friendsTitle)}>Their friends know who they are, but have no way to help... <br className={css(style.standardBreak)} /><span className={css(style.highlight)}>until now.</span></h1></AnimateAppearance>
            </div>
          </li>
          <li className={css(style.simpleNudj)}>
            <div className={css(style.simpleNudjContainer)}>
              <AnimateAppearance from='bottom'><h1 className={css(style.nudjTitle)}>With a simple nudj, you can help them access the best jobs and get rewarded in the process.</h1></AnimateAppearance>
            </div>
          </li>
        </ul>
      </section>
      <section className={css(style.how)}>
        <AnimateAppearance from='bottom'>
          <h2 className={css(style.bodyTitle)}><span className={css(style.howUnderline)}>How nudj works</span></h2>
        </AnimateAppearance>
        <ul className={css(style.steps)}>
          <li className={css(style.stepOne)}>
            <AnimateAppearance from='bottom' className={css(style.stepAnimationContainer)}>
              <img className={css(style.stepImage)} src='/assets/images/home-page/post-jobs-img.svg' />
              <h3 className={css(style.stepTitle)}>Step One</h3>
              <p className={css(style.stepBody)}>Great companies post their jobs.</p>
            </AnimateAppearance>
          </li>
          <li className={css(style.stepTwo)}>
            <AnimateAppearance from='bottom' className={css(style.stepAnimationContainer)}>
              <img className={css(style.stepImage)} src='/assets/images/home-page/ask-people-img.svg' />
              <h3 className={css(style.stepTitle)}>Step Two</h3>
              <p className={css(style.stepBody)}>They then ask the people they rate to recommend their talented friends...</p>
            </AnimateAppearance>
          </li>
          <li className={css(style.stepThree)}>
            <AnimateAppearance from='bottom' className={css(style.stepAnimationContainer)}>
              <img className={css(style.stepImage)} src='/assets/images/home-page/apply-button-img.svg' />
              <h3 className={css(style.stepTitle)}>Step Three</h3>
              <p className={css(style.stepBody)}>...who can apply in a matter of seconds & get direct access to the company.</p>
            </AnimateAppearance>
          </li>
          <li className={css(style.stepFour)}>
            <AnimateAppearance from='bottom' className={css(style.stepAnimationContainer)}>
              <img className={css(style.stepImage)} src='/assets/images/home-page/3-fist-img.svg' />
              <h3 className={css(style.stepTitle)}>Step Four</h3>
              <p className={css(style.stepBody)}>If they get hired then everyone gets rewarded - Everyone&apos;s a winner.</p>
            </AnimateAppearance>
          </li>
        </ul>
      </section>
      <section className={css(style.signup)}>
        <div className={css(style.signupContainer)}>
          <AnimateAppearance from='bottom'>
            <h2 className={css(style.signupTitle)}>What are you waiting for?</h2>
            <p className={css(style.signupSubtitle)}>We're all tired of recruiter spam, so we promise to only send you the stuff we know you'll care about (and you can opt out anytime).</p>
          </AnimateAppearance>
          <AnimateAppearance from='bottom'>
            <div className={css(style.cta)}>
              <RandomHoverButton href='/signup' volume='cheer' style={style.actionButton} id='signUp'>
                Sign up
              </RandomHoverButton>
              <span className={css(style.or)}>or</span>
              <RandomHoverButton href='/signup' id='open-intercom' style={style.actionButton}>
                Get in touch
              </RandomHoverButton>
            </div>
          </AnimateAppearance>
        </div>
      </section>
    </Page>)
}

module.exports = Talent
