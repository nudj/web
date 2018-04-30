const React = require('react')
const { Link } = require('react-router-dom')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const RandomHover = require('../../components/random-hover')

const Hirer = (props) => {
  const pageTitle = `Hire great people, faster, for less`
  const pageDescription = `nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.`

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
        <h1 className={style.heroTitle}>Hire better people for less</h1>
        <p className={style.heroSubtitle}>
          Referrals are best way to hire without breaking the bank. <br className={style.standardBreak} />
          With our simple software you can make them the <span className={style.underline}>only</span> way to hire.
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
              <h3 className={style.stepTitle}>Attract higher quality employees</h3>
              <p className={style.stepCopy}>Employees hired by referral are significantly more likely to stay at a company for longer and be more productive.</p>
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
          <p className={style.bodySubtitle}>Easily ask for, track and reward referrals inside and outside your company.</p>
        </div>
        <ul className={style.steps}>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/tent-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>1.</span> <br className={style.break} />Get set-up in seconds</h2>
              <p className={style.stepCopy}>Simply email our team your job spec to our team and we'll upload to our platform for you, allowing anyone to refer or apply for your company's job.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/dot-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>2.</span><br className={style.break} /> Connect the dots</h2>
              <p className={style.stepCopy}>Invite your employees and once on-board, our software will help them identify who in their networks is most likely to connect them with awesome, vouched-for talent.</p>
            </div>
          </li>
          <li className={style.step}>
            <img className={style.stepImage} src='/assets/images/hirer-page/paper-planes-img.svg' />
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}><span className={style.red}>3.</span> <br className={style.break} />Make it personal</h2>
              <p className={style.stepCopy}>One reason referral schemes fail is because they're just not personal. With our tested message templates and customisable incentives we can ensure everyone you ask takes action.</p>
            </div>
          </li>
          <li className={style.stepReverse}>
            <img className={style.stepImageReverse} src='/assets/images/hirer-page/review-the-best-img.svg' />
            <div className={style.stepDescriptionReverse}>
              <h2 className={style.stepTitle}><span className={style.red}>4.</span><br className={style.break} /> Review only the best</h2>
              <p className={style.stepCopy}>Referrals are known to help you attract the best talent, whether they're looking or not. After all, you wouldn't refer someone you didn't want to work with.</p>
            </div>
          </li>
          <li className={style.stepBottom}>
            <img className={style.stepImageBottom} src='/assets/images/hirer-page/paperwork.svg' />
            <div className={style.stepDescriptionBottom}>
              <h2 className={style.stepTitle}><span className={style.red}>5.</span><br className={style.break} /> Say goodbye to paperwork</h2>
              <p className={style.stepCopy}>We'll handle all the admin and payments so you don't have to. Giving you one less thing to worry about.</p>
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
            <p className={style.stepCopy}>Not only are nudj applicants of a high-quality, but they also come vouched for, meaning the only sensible option is to interview them.</p>
          </li>
          <li className={style.dataPoint}>
            <h3 className={style.stepTitle}><span className={style.red}>2x</span> faster to hire</h3>
            <p className={style.stepCopy}>On average it takes 1 month to hire a candidate through nudj. That’s compared to almost 2 months when using a recruiter.</p>
          </li>
          <li className={style.dataPoint}>
            <h3 className={style.stepTitle}><span className={style.red}>66%</span> cheaper than a recruiter</h3>
            <p className={style.stepCopy}>With even the cheapest recruiters charing 15% of first year salary and with job boards not delivering for up to £500 a go, we&apos;re always cheaper,</p>
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
            <p className={style.stepCopy}>Existing referral schemes involve setting a bonus and then sending generic emails announcing jobs to employees on-mass.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>2.</span> Hard to find who to ask</h3>
            <p className={style.stepCopy}>If employees do decide to share a job, they post it on social networks to nobody in particular.  Why? Because, while they might someone sutiable in their network, it’s a faff to find them.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>3.</span> Money doesn’t always work</h3>
            <p className={style.stepCopy}>Cash doesn't always motivate employees and it can have an adverse effect candidate quality if set to high. You also can’t easily reward those outside your company and, as a result, your job doesn’t reach everyone it should.</p>
          </li>
        </ul>
      </section>
      <section className={style.pricing}>
        <div className={style.pricingContainer}>
          <h2 className={style.pricingTitle}>Our pricing</h2>
          <p className={style.pricingSubtitle}>One risk-free fee. You don’t hire anyone you don’t pay.</p>
          <div className={style.pricingBox}>
            <h2 className={style.price}>£2,000 per job*</h2>
            <small className={style.pricingSmall}>*Payable within 30 days of making a hire.</small>
          </div>
          <div className={style.cta}>
            <RandomHover><a href='mailto:hello@nudj.co' id='open-intercom' className={style.signup}>Send us your jobs</a></RandomHover>
            <span className={style.or}>or</span>
            <Link to='/request' className={style.contact} id='requestAccess'>Request demo</Link>
          </div>
        </div>
      </section>
    </Page>
  )
}

module.exports = Hirer
