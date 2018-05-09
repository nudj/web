const React = require('react')
const { Link } = require('react-router-dom')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const RandomHover = require('../../components/random-hover')

const Hirer = (props) => {
  const pageTitle = `Supercharge your referral scheme with nudj`
  const pageDescription = `nudj makes it effortless for you and your team to ask for, track, and reward referrals.`

  const style = getStyle()
  return (
    <Page {...props} className={style.body}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
        <meta name='title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='twitter:description' content={pageDescription} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={pageTitle} />
        <meta property='twitter:card' content={pageTitle} />
        <meta property='twitter:title' content={pageTitle} />
        <meta property='og:site_name' content='nudj' />
      </Helmet>
      <Header
        backgroundColour='midRed'
        textColour='white'
        textHighlightColour='royalBlue'
        location='/hiring' />
      <section className={style.hero}>
        <h1 className={style.heroTitle}>Supercharge your referral scheme</h1>
        <p className={style.heroSubtitle}>
          Easily ask for, track and reward referrals inside and outside your company.
        </p>
      </section>
      <section className={style.takeaway}>
        <div className={style.takeawayLeft}>
          <h2 className={style.bodyTitle}>How nudj can help</h2>
          <p className={style.bodySubtitle}>Learn how our software can help your business.</p>
        </div>
        <div className={style.takeawayRight}>
          <ul className={style.benefits}>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Send more of the right referrals</h3>
              <p className={style.stepCopy}>Discover who exactly from your network can help you find the right people and incentivise them to refer.</p>
            </li>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Attract high quality employees</h3>
              <p className={style.stepCopy}>Employees hired by referral are likely to be more productive and stay for longer. We help you hire more of them.</p>
            </li>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Spend less, get better results</h3>
              <p className={style.stepCopy}>Referrals are significantly cheaper than any other hiring tool and with our risk-free pricing, you can make them work for your company.</p>
            </li>
          </ul>
        </div>
      </section>
      <section className={style.how}>
        <div className={style.header}>
          <h2 className={style.bodyTitle}><span className={style.howUnderline}>How nudj works</span></h2>
        </div>
        <ul className={style.steps}>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/tent-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>1.</span> <br className={style.break} /> Get set up in seconds</h2>
              <p className={style.stepCopy}>Send us your job specs and we&apos;ll upload them to our platform for you, instantly allowing anyone to refer or apply for your company&apos;s jobs.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/dot-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>2.</span><br className={style.break} /> Connect the dots</h2>
              <p className={style.stepCopy}>Invite your team and once on-board, our software helps them identify who in their network is most likely to connect them with awesome, vouched-for talent.</p>
            </div>
          </li>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/paper-planes-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>3.</span> <br className={style.break} />Make it personal</h2>
              <p className={style.stepCopy}>Referral schemes often fail, because they lack personalisation. With our tested message templates and customisable incentives we can ensure everyone you ask takes action.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/review-the-best-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>4.</span><br className={style.break} /> Review only the best</h2>
              <p className={style.stepCopy}>Referrals help you attract the best talent, whether they&apos;re looking or not. With nudj you can also see who referred them and why.</p>
            </div>
          </li>
          <li className={style.stepBottom}>
            <img className={style.stepImageBottom} src='/assets/images/hirer-page/paperwork.svg' />
            <div className={style.stepDescriptionBottom}>
              <h2 className={style.stepTitle}><span className={style.red}>5.</span><br className={style.break} /> Say goodbye to paperwork</h2>
              <p className={style.stepCopy}>We&apos;ll handle all the admin and payments so you don&apos;t have to. Giving you one less thing to worry about.</p>
            </div>
          </li>
        </ul>
      </section>
      <section className={style.compare}>
        <div className={style.header}>
          <h2 className={style.bodyTitle}><span className={style.compareUnderline}>How we compare</span></h2>
          <p className={style.bodySubtitle}>Anyone can say they&apos;re the best, so we&apos;ll just let the numbers* do the talking.</p>
        </div>
        <ul className={style.dataPoints}>
          <li className={style.dataPoint}>
            <h3 className={style.stepTitle}><span className={style.red}>85%</span> of applicants interviewed</h3>
            <p className={style.stepCopy}>Not only are nudj applicants high-quality, but they also come vouched for, meaning the only sensible option is to interview them.</p>
          </li>
          <li className={style.dataPoint}>
            <h3 className={style.stepTitle}><span className={style.red}>2x</span> faster to hire</h3>
            <p className={style.stepCopy}>On average it takes 1 month to hire a candidate through nudj, compared to almost 2 months when using a recruiter.</p>
          </li>
          <li className={style.dataPoint}>
            <h3 className={style.stepTitle}><span className={style.red}>66%</span> cheaper than a recruiter</h3>
            <p className={style.stepCopy}>With even the cheapest recruiters charging 15% and costly job board subscriptions not delivering, we offer better value for money.</p>
          </li>
        </ul>
        <p className={style.bodyNudj}>*based on tests with these lovely people.</p>
      </section>
      <section className={style.clients}>
        <div className={style.logoWrapper}>
          <img className={style.brand} src='/assets/images/hirer-page/ct-2.png' />
          <img className={style.brand} src='/assets/images/hirer-page/meem.png' />
          <img className={style.brand} src='/assets/images/hirer-page/fundstack.png' />
        </div>
      </section>
      <section className={style.referrals}>
        <div className={style.header}>
          <h2 className={style.bodyTitle}><span className={style.compareUnderline}>The power of referrals</span></h2>
          <p className={style.bodySubtitle}>Referrals account for just 7% of applications but make up 40% of hires.</p>
        </div>
        <div className={style.barChart}>
          <div className={style.chartImages}>
            <img className={style.barLeft} src='assets/images/hirer-page/left-bar-chart.svg' />
            <img className={style.barRight} src='assets/images/hirer-page/right-bar-chart.svg' />
            <img className={style.barArrows} src='assets/images/hirer-page/arrows.svg' />
          </div>
          <div className={style.chartKey}>
            <div className={style.keyOther}>
              <h4 className={style.keyTitle}>Other channels</h4>
              <p className={style.stepCopy}>
                Expensive<br />
                Hundreds of irrelevant applications<br />
                No quality control<br />
                Targets active candidates
              </p>
            </div>
            <div className={style.keyReferrals}>
              <h4 className={style.keyTitle}>Referrals</h4>
              <p className={style.stepCopy}>
                Targets passive candidates<br />
                Better cultural and team fit<br />
                Higher quality<br />
                Peer-vetted
              </p>
            </div>
          </div>
        </div>
        <div className={style.header}>
          <p className={style.bodySubtitle}>So, why do you need nudj...</p>
        </div>
        <ul className={style.whys}>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>1.</span> Not personal enough</h3>
            <p className={style.stepCopy}>Existing referral schemes aren&apos;t engaging, becuase they&apos;re not personalised to each employee or referrer.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>2.</span> Hard to find who to ask</h3>
            <p className={style.stepCopy}>If employees do decide to share a job, they post it on social networks to nobody in particular. Why? Because, while there might be someone suitable in their network, it&apos;s a faff to find them.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>3.</span> Money doesn&apos;t always work</h3>
            <p className={style.stepCopy}>Cash doesn&apos;t always motivate employees and it can have an adverse effect on candidate quality if set too high. Also, you can&apos;t easily reward those outside your company, meaning your job doesn&apos;t reach everyone it should.</p>
          </li>
        </ul>
      </section>
      <section className={style.pricing}>
        <div className={style.pricingContainer}>
          <h2 className={style.pricingTitle}>Our pricing</h2>
          <p className={style.pricingSubtitle}>One risk-free fee. You don&apos;t hire anyone you don&apos;t pay.</p>
          <div className={style.pricingBox}>
            <h2 className={style.price}>£2,000 per job*</h2>
            <small className={style.pricingSmall}>*Payable within 30 days of making a hire.</small>
          </div>
          <div className={style.cta}>
            <RandomHover><Link to='/request' id='requestAccess' className={style.signup}>Send us your jobs</Link></RandomHover>
            <span className={style.or}>or</span>
            <a href='mailto:hello@nudj.co' className={style.contact} id='open-intercom'>Request demo</a>
          </div>
        </div>
      </section>
    </Page>
  )
}

module.exports = Hirer
