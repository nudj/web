const React = require('react')
const TypeOut = require('react-typeout').default
const { Link } = require('react-router-dom')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const AnimateAppearance = require('../../components/animate-appearance')
const Header = require('../../components/header')
const RandomHover = require('../../components/random-hover')

const words = [
  'designers',
  'product managers',
  'marketers',
  'sales people',
  'developers'
]

const HomePage = (props) => {
  const style = getStyle()
  return (
    <Page {...props} className={style.body}>
      <div className={style.header}>
        <Header />
      </div>
      <section className={style.hero}>
        <ul className={style.story}>
          <li className={style.notHappy}>
            <div className={style.notHappyContainer}>
              <AnimateAppearance from='bottom'>
                <h1 className={style.heroTitle}>The best <TypeOut words={words} className={style.typeout} pauseSpeed={5000} /> are always busy,<br className={style.oppositeBreak} /> but they aren't always happy.</h1>
              </AnimateAppearance>
            </div>
          </li>
          <li className={style.unknown}>
            <div className={style.unknownContainer}>
              <AnimateAppearance from='right'><h1 className={style.unknownTitle}>They're often hard to find and are unknown to most.</h1></AnimateAppearance>
            </div>
          </li>
          <li className={style.friends}>
            <div className={style.friendsContainer}>
              <AnimateAppearance from='left'><h1 className={style.friendsTitle}>Their friends know who they are, but have no way to help... <br className={style.standardBreak} /><span className={style.highlight}>until now.</span></h1></AnimateAppearance>
            </div>
          </li>
          <li className={style.simpleNudj}>
            <div className={style.simpleNudjContainer}>
              <AnimateAppearance from='bottom'><h1 className={style.nudjTitle}>With a simple nudj, you can help them access the best jobs and get rewarded in the process.</h1></AnimateAppearance>
            </div>
          </li>
        </ul>
      </section>
      <section className={style.how}>
        <AnimateAppearance from='bottom'>
          <h2 className={style.bodyTitle}><span className={style.howUnderline}>How nudj works</span></h2>
        </AnimateAppearance>
        <ul className={style.steps}>
          <li className={style.stepOne}>
            <AnimateAppearance from='bottom' className={style.stepAnimationContainer}>
              <img className={style.stepImage} src='/assets/images/home-page/post-jobs-img.svg' />
              <h3 className={style.stepTitle}>Step One</h3>
              <p className={style.stepBody}>Great companies post their jobs.</p>
            </AnimateAppearance>
          </li>
          <li className={style.stepTwo}>
            <AnimateAppearance from='bottom' className={style.stepAnimationContainer}>
              <img className={style.stepImage} src='/assets/images/home-page/ask-people-img.svg' />
              <h3 className={style.stepTitle}>Step Two</h3>
              <p className={style.stepBody}>They then ask the people they rate to recommend their talented friends...</p>
            </AnimateAppearance>
          </li>
          <li className={style.stepThree}>
            <AnimateAppearance from='bottom' className={style.stepAnimationContainer}>
              <img className={style.stepImage} src='/assets/images/home-page/apply-button-img.svg' />
              <h3 className={style.stepTitle}>Step Three</h3>
              <p className={style.stepBody}>...who can apply in a matter of seconds & get direct access to the company.</p>
            </AnimateAppearance>
          </li>
          <li className={style.stepFour}>
            <AnimateAppearance from='bottom' className={style.stepAnimationContainer}>
              <img className={style.stepImage} src='/assets/images/home-page/3-fist-img.svg' />
              <h3 className={style.stepTitle}>Step Four</h3>
              <p className={style.stepBody}>If they get hired then everyone gets rewarded - Everyone's a winner.</p>
            </AnimateAppearance>
          </li>
        </ul>
      </section>
      <section className={style.signup}>
        <div className={style.signupContainer}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.signupTitle}>What are you waiting for?</h2>
            <p className={style.signupSubtitle}>We're all tired of recruiter spam, so we promise to only send you the stuff we know you'll care about (and you can opt out anytime).</p>
          </AnimateAppearance>
          <AnimateAppearance from='bottom'>
            <div className={style.cta}>
              <RandomHover><Link to='/signup' className={style.signupButton}>Sign up</Link></RandomHover>
              <span className={style.or}>or</span>
              <a href='/' id='open-intercom' className={style.contact}>Get in touch</a>
            </div>
          </AnimateAppearance>
        </div>
      </section>
    </Page>)
}

module.exports = HomePage
