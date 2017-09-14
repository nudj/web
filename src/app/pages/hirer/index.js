const React = require('react')
const { Link } = require('react-router-dom')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')
const RandomHover = require('../../components/random-hover')

const Hirer = (props) => {
  const style = getStyle()
  return (
    <Page {...props} className={style.body}>
      <Header
        backgroundColour='midRed'
        textColour='white'
        textHighlightColour='royalBlue' />
      <section className={style.hero}>
        <AnimateAppearance from='bottom'>
          <h1 className={style.heroTitle}>The best jobs aren’t advertised. <br className={style.standardBreak} />The best talent isn’t looking. <br className={style.standardBreak} />Maybe they just need a nudj.</h1>
        </AnimateAppearance>
      </section>
      <section className={style.how}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.bodyTitle}><span className={style.howUnderline}>How nudj works</span></h2>
            <p className={style.bodySubtitle}>Easily ask for, track and reward referrals inside and outside your company.</p>
          </AnimateAppearance>
        </div>
        <ul className={style.steps}>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/tent-img.svg' />
            <div className={style.stepDescription}>
              <AnimateAppearance from='left'>
                <h2 className={style.stepTitle}><span className={style.red}>1.</span> <br className={style.break} />Get set-up in seconds</h2>
                <p className={style.stepCopy}>Simply enter a few details about your company, and, hey-presto, your jobs will appear on the nudj network.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/dot-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <AnimateAppearance from='right'>
                <h2 className={style.stepTitle}><span className={style.red}>2.</span><br className={style.break} /> Connect the dots</h2>
                <p className={style.stepCopy}>We'll automatically identify the people most likely to put you in touch with awesome talent, whether they’re in your network or ours.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/paper-planes-img.svg' />
            <div className={style.stepDescription}>
              <AnimateAppearance from='left'>
                <h2 className={style.stepTitle}><span className={style.red}>3.</span> <br className={style.break} />Make it personal</h2>
                <p className={style.stepCopy}>Get help tailoring your messages and incentives to ensure those you ask take action.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/review-the-best-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <AnimateAppearance from='right'>
                <h2 className={style.stepTitle}><span className={style.red}>4.</span><br className={style.break} /> Review only the best</h2>
                <p className={style.stepCopy}>Get a curated list of the best applicants and only the juicy details delivered straight to your inbox or ATS of your choice.</p>
              </AnimateAppearance>
            </div>
          </li>
          <li className={style.stepBottom}>
            <img className={style.stepImageBottom} src='/assets/images/hirer-page/paperwork.svg' />
            <div className={style.stepDescriptionBottom}>
              <AnimateAppearance from='bottom'>
                <h2 className={style.stepTitle}><span className={style.red}>5.</span><br className={style.break} /> Say goodbye to paperwork</h2>
                <p className={style.stepCopy}>We’ll then handle all the admin and payments so you don’t have to. One less thing for you to worry about.</p>
              </AnimateAppearance>
            </div>
          </li>
        </ul>
      </section>
      <section className={style.compare}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.bodyTitle}><span className={style.compareUnderline}>How we compare</span></h2>
            <p className={style.bodySubtitle}>Anyone can say they're the best, so we'll just let the numbers do the talking.</p>
          </AnimateAppearance>
        </div>
        <AnimateAppearance from='bottom'>
          <table className={style.table}>
            <thead>
              <tr className={style.tableHeaderRow}>
                <th className={style.tableHeaderFirst} />
                <th className={style.tableHeader}>Recruiter</th>
                <th className={style.tableHeader}>Job Boards</th>
                <th className={style.tableHeader}>nudj<span className={style.red}>*</span></th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              <tr className={style.tableRow}>
                <td className={style.tableLeft}>Cost of Hire</td>
                <td className={style.tableItem}>£5,000</td>
                <td className={style.tableItem}>£250</td>
                <td className={style.tableItemNudj}>£750</td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.tableLeft}>Time to Hire</td>
                <td className={style.tableItem}>55 Days</td>
                <td className={style.tableItem}>56 Days</td>
                <td className={style.tableItemNudj}>20 Days</td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.tableLeftFinal}>Fill Rate</td>
                <td className={style.tableItem}>18%</td>
                <td className={style.tableItem}>15%</td>
                <td className={style.tableItemNudj}>56%</td>
              </tr>
            </tbody>
          </table>
        </AnimateAppearance>
        <AnimateAppearance from='bottom'>
          <p className={style.bodyNudj}>*based on tests with these lovely people.</p>
        </AnimateAppearance>
      </section>
      <section className={style.clients}>
        <AnimateAppearance from='bottom'>
          <div className={style.logoWrapper}>
            <img className={style.brand} src='/assets/images/hirer-page/mams.png' />
            <img className={style.brand} src='/assets/images/hirer-page/ct.png' />
            <img className={style.brand} src='/assets/images/hirer-page/mp.png' />
          </div>
        </AnimateAppearance>
      </section>
      <section className={style.pricing}>
        <div className={style.pricingContainer}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.pricingTitle}>How much does it cost?</h2>
            <p className={style.pricingSubtitle}>We will be announcing our pricing very soon, but while we're still in beta it costs...</p>
          </AnimateAppearance>
          <AnimateAppearance from='bottom'>
            <div className={style.pricingBox}>
              <h2 className={style.price}>£0 + Referral Fee</h2>
              <small className={style.pricingSmall}>So, sign up for beta access today!</small>
            </div>
          </AnimateAppearance>
          <div className={style.cta}>
            <AnimateAppearance from='bottom'>
              <RandomHover><Link to='/request' className={style.signup}>Request access</Link></RandomHover>
              <span className={style.or}>or</span>
              <a href='/' id='open-intercom' className={style.contact}>Get in touch</a>
            </AnimateAppearance>
          </div>
        </div>
      </section>
    </Page>
  )
}

module.exports = Hirer
