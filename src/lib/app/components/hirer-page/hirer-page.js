import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './hirer-page.css'

const Component = (props) => (
  <div className={style.body}>
    <section className={style.hero}>
      <h1 className={style.heroTitle}>The best jobs aren’t advertised. <br className={style.standardBreak} />The best talent isn’t looking. <br className={style.standardBreak} />Maybe they just need a nudj.</h1>
    </section>
    <section className={style.how}>
      <div className={style.flexColumn}>
        <h2 className={style.bodyTitle}><span className={style.howUnderline}>How nudj works</span></h2>
        <ul className={style.steps}>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/tent-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>1.</span> <br className={style.break} />Get set-up in seconds</h2>
              <p className={style.stepCopy}>Simply enter a few details about your company, and, hey-presto, your jobs will appear on the nudj network.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/dot-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>2.</span><br className={style.break} /> Connect the dots</h2>
              <p className={style.stepCopy}>We'll automatically identify the people most likely to put you in touch with awesome talent, whether they’re in your network or ours.</p>
            </div>
          </li>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/paper-planes-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>3.</span> <br className={style.break} />Make it personal</h2>
              <p className={style.stepCopy}>Get help tailoring your messages and incentives to ensure those you ask take action.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/review-the-best-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>4.</span><br className={style.break} /> Review only the best</h2>
              <p className={style.stepCopy}>Get a curated list of the best applicants and only the juicy details delivered straight to your inbox or ATS of your choice.</p>
            </div>
          </li>
          <li className={style.stepBottom}>
            <img className={style.stepImageBottom} src='/assets/images/paperwork.svg' />
            <div className={style.stepDescriptionBottom}>
              <h2 className={style.stepTitle}><span className={style.red}>5.</span><br className={style.break} /> Connect the dots</h2>
              <p className={style.stepCopy}>We'll automatically identify the people most likely to put you in touch with awesome talent, whether they’re in your network or ours.</p>
            </div>
          </li>
        </ul>
        <div className={style.footerImage}>
          <img src='/assets/images/page-break-img.svg' />
        </div>
      </div>
    </section>
    <section className={style.compare}>
      <div className={style.flexColumn}>
        <div className={style.header}>
          <h2 className={style.bodyTitle}><span className={style.compareUnderline}>How we compare</span></h2>
          <p className={style.bodySubtitle}>Anyone can say they're the best, so we'll just let the numbers do the talking.</p>
        </div>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader} />
              <th className={style.tableHeader}>Recruiter</th>
              <th className={style.tableHeader}>Internal Referrals</th>
              <th className={style.tableHeader}>nudj<span className={style.red}>*</span></th>
            </tr>
          </thead>
          <tbody className={style.tableBody}>
            <tr>
              <td className={style.tableLeft}>Cost of Hire</td>
              <td className={style.tableItem}>£3,000</td>
              <td className={style.tableItem}>£1,000</td>
              <td className={style.tableItemNudj}>£750</td>
            </tr>
            <tr>
              <td className={style.tableLeft}>Time to Hire</td>
              <td className={style.tableItem}>55 Days</td>
              <td className={style.tableItem}>29 Days</td>
              <td className={style.tableItemNudj}>20 Days</td>
            </tr>
            <tr>
              <td className={style.tableLeft}>Fill Rate</td>
              <td className={style.tableItem}>18%</td>
              <td className={style.tableItem}>40%</td>
              <td className={style.tableItemNudj}>56%</td>
            </tr>
          </tbody>
        </table>
        <p className={style.bodyNudj}>*based on tests with these lovely people.</p>
      </div>
    </section>
    <section className={style.clients}>
      <div className={style.logoWrapper}>
        <img className={style.brand} src='/assets/images/mams.png' />
        <img className={style.brand} src='/assets/images/ct.png' />
        <img className={style.brand} src='/assets/images/mp.png' />
      </div>
    </section>
    <section className={style.pricing}>
      <div className={style.flexColumn}>
        <h2 className={style.pricingTitle}>How much does it cost?</h2>
        <p className={style.pricingSubtitle}>We will be announcing our pricing very soon, but while we're still in beta it costs...</p>
        <div className={style.pricingBox}>
          <h2 className={style.price}>£0 + Referral Fee</h2>
          <small className={style.pricingSmall}>So, sign up for beta access today!</small>
        </div>
        <div className={style.cta}>
          <Link to='/signup' className={style.signup}>Sign up</Link>
          <span className={style.or}>or</span>
          <Link to='/' id='open-intercom' className={style.contact}>Get in touch</Link>
        </div>
      </div>
    </section>
  </div>
)

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
