const React = require('react')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const RandomHover = require('../../components/random-hover')
const Video = require('../../components/video')

const Hirer = (props) => {
  const pageTitle = `Supercharge your referral scheme with nudj`
  const pageDescription = `nudj makes it effortless for you and your team to ask for, track, and reward referrals.`
  const hireUrl = `${props.app.hire.protocol}://${props.app.hire.hostname}/`
  const style = getStyle()

  return (
    <Page {...props} className={style.body}>
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
      <Header
        backgroundColour='midRed'
        textColour='white'
        textHighlightColour='royalBlue'
        location='/hiring' />
      <section className={style.hero}>
        <h1 className={style.heroTitle}>Better manage your employee referral scheme <br className={style.standardBreak} />and hire more great people</h1>
        <p className={style.heroSubtitle}>
          Easily ask for, track and reward referrals inside and outside your company.
        </p>
        <div className={style.heroCta}>
          <RandomHover>
            <a
              href={hireUrl}
              id='getStarted'
              className={style.signup}
            >
              Get started
            </a>
          </RandomHover>
        </div>
      </section>
      <section className={style.takeaway}>
        <div className={style.takeawayLeft}>
          <h2 className={style.bodyTitle}>How nudj can help</h2>
          <p className={style.bodySubtitle}>Learn how our software can help your business.</p>
        </div>
        <div className={style.takeawayRight}>
          <ul className={style.benefits}>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Make more referrals happen</h3>
              <p className={style.stepCopy}>We'll help your team find more of the right people, who are worth referring, and incentivise them to reach out.</p>
            </li>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Attract high quality employees</h3>
              <p className={style.stepCopy}>Referred employees are more productive and stick around for longer. All you need to do is hire more of them..</p>
            </li>
            <li className={style.benefit}>
              <h3 className={style.stepTitle}>Spend less, get better results</h3>
              <p className={style.stepCopy}>Referrals cost less and deliver better results. Combined with our free tool, you could save over £2,000 per hire.</p>
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
            <div className={style.stepSupportingImagery}>
              <div className={style.stepVideoContainer}>
                <Video
                  poster='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/setup-company.png'
                  loop
                >
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/setup-company.mp4' type='video/mp4' />
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/setup-company.webm' type='video/webm' />
                </Video>
              </div>
            </div>
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}>
                <span className={style.red}>1.</span>{' '}
                Get setup in seconds
              </h2>
              <p className={style.stepCopy}>
                Add a few key details about the roles you&apos;re
                hiring for and they&apos;ll appear on our platform.
                Or, email us your jobs and we&apos;ll upload them&nbsp;for&nbsp;you.
              </p>
            </div>
          </li>
          <li className={style.step}>
            <div className={style.stepSupportingImagery}>
              <div className={style.stepVideoContainer}>
                <Video
                  loop
                  poster='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/team-invite.png'
                >
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/team-invite.mp4' type='video/mp4' />
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/team-invite.webm' type='video/webm' />
                </Video>
              </div>
            </div>
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}>
                <span className={style.red}>2.</span>{' '}
                Access your employee network
              </h2>
              <p className={style.stepCopy}>
                Invite your team to share your jobs,
                extending your reach and increasing
                your chances of finding great people&nbsp;to&nbsp;hire.
              </p>
            </div>
          </li>
          <li className={style.step}>
            <div className={style.stepSupportingImagery}>
              <div className={style.stepVideoContainer}>
                <Video
                  loop
                  poster='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/easy-share.png'
                >
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/easy-share.mp4' type='video/mp4' />
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/easy-share.webm' type='video/webm' />
                </Video>
              </div>
            </div>
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}>
                <span className={style.red}>3.</span>{' '}
                Share trackable links to any of your jobs
              </h2>
              <p className={style.stepCopy}>
                Every colleague gets a unique link for each of your jobs, all
                they have to do is pick the platform they want to
                share&nbsp;them&nbsp;on.
              </p>
            </div>
          </li>
          <li className={style.step}>
            <div className={style.stepSupportingImagery}>
              <div className={style.stepVideoContainer}>
                <Video
                  loop
                  poster='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/survey.png'
                >
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/survey.mp4' type='video/mp4' />
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/survey.webm' type='video/webm' />
                </Video>
              </div>
            </div>
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}>
                <span className={style.red}>4.</span>{' '}
                Find more people to refer
              </h2>
              <p className={style.stepCopy}>
                By using a set of unique questions,
                we&apos;ll help your team uncover more people
                from their networks who are&nbsp;worth&nbsp;referring.
              </p>
            </div>
          </li>
          <li className={style.step}>
            <div className={style.stepSupportingImagery}>
              <div className={style.stepVideoContainer}>
                <Video
                  loop
                  poster='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/applicants.png'
                >
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/applicants.mp4' type='video/mp4' />
                  <source src='https://nudjcms.s3.amazonaws.com/assets/videos/demo-jun-18/applicants.webm' type='video/webm' />
                </Video>
              </div>
            </div>
            <div className={style.stepDescription}>
              <h2 className={style.stepTitle}>
                <span className={style.red}>5.</span>{' '}
                Easily manage your applications
              </h2>
              <p className={style.stepCopy}>
                View all your applicants in one place and
                contact them from your account when you want
                to take them to the&nbsp;next&nbsp;stage.
              </p>
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
            <img className={style.barLeft} src='assets/images/hirer-page/left-bar-chart.svg' alt='A bar chart showing that referrals account for 7% of applications' />
            <img className={style.barRight} src='assets/images/hirer-page/right-bar-chart.svg' alt='A bar chart showing that referrals make up 40% of all hires' />
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
          <h2 className={style.bodyTitle}><span className={style.howUnderline}>Why you need nudj</span></h2>
          <p className={style.bodySubtitle}>Everyone knows referrals are the best way to hire, but most schemes fail because...</p>
        </div>
        <ul className={style.whys}>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>1.</span> They&apos;re not personal enough</h3>
            <p className={style.stepCopy}>Existing referral schemes aren&apos;t engaging, because they&apos;re not personalized to each employee or referrer.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>2.</span> It&apos;s hard to know who to ask</h3>
            <p className={style.stepCopy}>If employees do decide to share a job, they post it on social networks to nobody in particular. Why? Because, while there might be someone suitable in their network, it&apos;s hard to find them.</p>
          </li>
          <li className={style.why}>
            <h3 className={style.stepTitle}><span className={style.red}>3.</span> Money doesn&apos;t always work</h3>
            <p className={style.stepCopy}>Cash doesn&apos;t always motivate employees and it can have an adverse effect on candidate quality if set too high. Also, you can&apos;t easily reward those outside your company, meaning your job doesn&apos;t reach everyone it should.</p>
          </li>
        </ul>
      </section>
      <section className={style.pricing} id='pricing'>
        <div className={style.pricingContainer}>
          <h2 className={style.pricingTitle}>Our pricing</h2>
          <p className={style.pricingSubtitle}>Unlimited jobs. Unlimited users. One monthly fee.</p>
          <div className={style.pricingBox}>
            <h2 className={style.price}>$99/month</h2>
            <small className={style.pricingSmall}>14-day free trial. No payment details needed.</small>
          </div>
          <div className={style.cta}>
            <RandomHover><a href={hireUrl} id='getStartedBottom' className={style.signup}>Get started</a></RandomHover>
            <span className={style.or}>or</span>
            <a href='mailto:hello@nudj.co' className={style.contact} id='open-intercom'>Request demo</a>
          </div>
        </div>
      </section>
    </Page>
  )
}

module.exports = Hirer
