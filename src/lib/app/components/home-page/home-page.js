import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './home-page.css'

const Component = (props) => (
  <div className={style.body}>
    <section className={style.hero}>
      <ul className={style.story}>
        <li className={style.notHappy}>
          <h1 className={style.heroTitle}>The best <span className={style.red}>designers</span> are always<br className={style.break} /> busy, but aren't always happy.</h1>
          <img className={style.heroImage} src='/assets/images/unhappy-img.svg' />
        </li>
        <li className={style.unknown}>
          <h1 className={style.unknownTitle}>They're often hard to find and are unknown to most.</h1>
        </li>
        <li className={style.friends}>
          <h1 className={style.friendsTitle}>Their friends know who they are, but have no way to help... <span className={style.red}><br />until now.</span></h1>
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
          <img src='/assets/images/post-jobs-img.svg' />
          <h3 className={style.stepTitle}>Step One</h3>
          <p className={style.stepBody}>Great companies post their jobs.</p>
        </li>
        <li className={style.stepTwo}>
          <img src='/assets/images/ask-people-img.svg' />
          <h3 className={style.stepTitle}>Step Two</h3>
          <p className={style.stepBody}>They then ask the people they rate to recommend their talented friends...</p>
        </li>
        <li className={style.stepThree}>
          <img src='/assets/images/apply-button-img.svg' />
          <h3 className={style.stepTitle}>Step Three</h3>
          <p className={style.stepBody}>...who can apply in a matter of seconds & get direct access to the company.</p>
        </li>
        <li className={style.stepFour}>
          <img src='/assets/images/3-fist-img.svg' />
          <h3 className={style.stepTitle}>Step Four</h3>
          <p className={style.stepBody}>If they get hired then everyone gets rewarded - Everyone's a winner, baby.</p>
        </li>
      </ul>
    </section>
    <section className={style.signup}>
      <h2 className={style.signupTitle}>What are you waiting for?</h2>
      <p className={style.signupSubtitle}>We're all tired of recruiter spam, so we promise to only send you the stuff we know you'll care about (and you can opt-out anytime).</p>
      <div className={style.cta}>
        <Link to='/signup' className={style.signupButton}>Sign up</Link>
        <span className={style.or}>or</span>
        <Link to='/' id='open-intercom' className={style.contact}>Get in touch</Link>
      </div>
    </section>
  </div>
)

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
