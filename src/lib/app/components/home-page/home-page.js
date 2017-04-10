import React from 'react'
import { Link } from 'react-router-dom'
import style from './home-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.background}>
      <div className={style.hero}>
        <div className={style.heroBody}>
          <div className={style.outcomes}>
            <div className={style.outcome}>
              <div className={style.outcomeImage}>&#x1F61E;</div>
              <h1 className={style.outcomeText}>The best people are always busy in their jobs, but they aren't always happy.</h1>
            </div>
            <div className={style.outcome}>
              <div className={style.outcomeImage}>&#x1F440;&#x1F464;</div>
              <h1 className={style.outcomeText}>They're often hard to find &amp; unknown to most.</h1>
            </div>
            <div className={style.outcome}>
              <div className={style.outcomeImage}>&#x1F46D;</div>
              <h1 className={style.outcomeText}>Their friends know who they are, but have no way to help... until now.</h1>
            </div>
            <div className={style.outcome}>
              <div className={style.outcomeImage}>&#x1F91C;&#x1F91B;</div>
              <h1 className={style.outcomeText}>With a simple nudj, help them access the best jobs &amp; get rewarded in the process.</h1>
            </div>
          </div>
        </div>
        <div className={style.heroFooter}>
          <div className={style.indicator}>&#x1F447;</div>
        </div>
      </div>
    </div>
    <div className={style.sectionMedium}>
      <h2 className={style.title}>How it works</h2>
      <p className={style.subtitle}>Now a subheadline where explain your wonderful new startup even more</p>
      <div className={style.howItWorks}>
        <div className={style.number}>1.</div>
        <p className={style.step}>Great companies post their jobs on nudj.</p>
        <div className={style.number}>2.</div>
        <p className={style.step}>They then ask the people they rate to recommend their talented friends...</p>
        <div className={style.number}>3.</div>
        <p className={style.step}>...who can apply in a matter of seconds &amp; get direct access to the company.</p>
        <div className={style.number}>4.</div>
        <p className={style.step}>If they get hired then everyone gets rewarded - they get an awesome new job, the company gets an awesome employee and the friend that referred them get's paid!</p>
        <div className={style.everyone}>&#x1F483;&nbsp;<Link to='//www.youtube.com/watch?v=-SFFRaIUisY' className={style.link}>Everyone's a winner, baby!</Link>&#x1F57A;</div>
      </div>
    </div>
    <div className={style.sectionMedium}>
      <h2 className={style.title}>What are you waiting for?</h2>
      <p className={style.subtitle}>With your help, we connect the best companies with the best people, without any of the faff.</p>
      <div className={style.buttons}>
        <Link to='' className={style.button}>Sign-up for updates</Link>
        <span className={style.spacer}>or</span>
        <Link to='' className={style.buttonLink} id='open-intercom'>Get in touch</Link>
      </div>
    </div>
  </div>
)
