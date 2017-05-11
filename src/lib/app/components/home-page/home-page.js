import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TypeOut from 'react-typeout'
import style from './home-page.css'

const words = [
  'designers',
  'engineers',
  'clowns'
]

const HomePage = () => (
  <div className={style.body}>
    <section className={style.hero}>
      <ul className={style.story}>
        <li className={style.notHappy}>
          <h1 className={style.heroTitle}>The best <TypeOut words={words} className={style.typeout} /> are always busy in <br className={style.oppositeBreak} />their jobs, but they are not always happy.</h1>
          <img className={style.heroImage} src='/assets/images/home-page/unhappy-img.svg' />
        </li>
        <li className={style.unknown}>
          <h1 className={style.unknownTitle}>They're often hard to find and are unknown to most.</h1>
        </li>
        <li className={style.friends}>
          <h1 className={style.friendsTitle}>Their friends know who they are, but have no way to help... <span className={style.red}><br className={style.standardBreak} />until now.</span></h1>
        </li>
        <li className={style.simpleNudj}>
          <h1 className={style.nudjTitle}>With a simple nudj, you can help them access the best jobs and get rewarded in the process.</h1>
        </li>
      </ul>
    </section>
    <section className={style.how}>
      <h2 className={style.bodyTitle}><span className={style.howUnderline}>How nudj works</span></h2>
      <ul className={style.steps}>
        <li className={style.stepOne}>
          <img className={style.stepImage} src='/assets/images/home-page/post-jobs-img.svg' />
          <h3 className={style.stepTitle}>Step One</h3>
          <p className={style.stepBody}>Great companies post their jobs.</p>
        </li>
        <li className={style.stepTwo}>
          <img className={style.stepImage} src='/assets/images/home-page/ask-people-img.svg' />
          <h3 className={style.stepTitle}>Step Two</h3>
          <p className={style.stepBody}>They then ask the people they rate to recommend their talented friends...</p>
        </li>
        <li className={style.stepThree}>
          <img className={style.stepImage} src='/assets/images/home-page/apply-button-img.svg' />
          <h3 className={style.stepTitle}>Step Three</h3>
          <p className={style.stepBody}>...who can apply in a matter of seconds & get direct access to the company.</p>
        </li>
        <li className={style.stepFour}>
          <img className={style.stepImage} src='/assets/images/home-page/3-fist-img.svg' />
          <h3 className={style.stepTitle}>Step Four</h3>
          <p className={style.stepBody}>If they get hired then everyone gets rewarded - Everyone's a winner.</p>
        </li>
      </ul>
    </section>
    <section className={style.signup}>
      <h2 className={style.signupTitle}>What are you waiting for?</h2>
      <p className={style.signupSubtitle}>We're all tired of recruiter spam, so we promise to only send you the stuff we know you'll care about (and you can opt out anytime).</p>
      <div className={style.cta}>
        <a href='/signup' className={style.signupButton}>Sign up</a>
        <span className={style.or}>or</span>
        <a href='/' id='open-intercom' className={style.contact}>Get in touch</a>
      </div>
    </section>
  </div>
)

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))
