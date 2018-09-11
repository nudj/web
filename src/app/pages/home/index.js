const React = require('react')
const { Helmet } = require('react-helmet')

const { Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

/** TODO: Refactor Page and Header if applicable */
const Page = require('../../components/page')
const Navigation = require('../../components/header')
const RandomHover = require('../../components/composable-random-hover')
const Section = require('../../components/section')
const Statistic = require('../../components/statistic')
const ClientGrid = require('../../components/client-grid')
const Blockquote = require('../../components/blockquote')
const Citation = require('../../components/citation')
const Conversation = require('../../components/conversation')
const WobblyBox = require('../../components/wobbly-box')
const style = require('./style.css')

const benImage = 'assets/app/pages/home/ben.png'
const dittoSvg = 'assets/app/pages/home/ditto.svg'
const head1Svg = 'assets/app/pages/home/head-1.svg'
const head2Svg = 'assets/app/pages/home/head-2.svg'
const head3Svg = 'assets/app/pages/home/head-3.svg'
const head4Svg = 'assets/app/pages/home/head-4.svg'
const headNudjSvg = 'assets/app/pages/home/head-nudj.svg'

const getConversations = () => {
  const poorlyCommunicatedConversation = [{
    displayPicture: head1Svg,
    name: 'People team',
    body: (
      <p className={css(mss.reg)}>
        We send a company wide email once a week, but we don’t get a very
        good response.
      </p>
    ),
    recipient: true
  }, {
    displayPicture: headNudjSvg,
    name: 'nudj',
    body: (
      <p className={css(mss.reg)}>
        nudj personalises communication to the individual referrers and send
        gentle reminders to make sure they don’t forget to take action.
      </p>
    ),
    recipient: false
  }]

  const tooMuchWorkConversation = [{
    displayPicture: head2Svg,
    name: 'Employee',
    body: (
      <p className={css(mss.reg)}>
        Making a referral is a job in itself. Asking my network, getting their
        CV and uploading it into the system is too time consuming, so I
        don’t bother.
      </p>
    ),
    recipient: true
  }, {
    displayPicture: headNudjSvg,
    name: 'nudj',
    body: (
      <p className={css(mss.reg)}>
        With nudj, anyone can make a referral in 2-clicks and post trackable
        links to any platform, allowing even the busiest of employees to ask
        their network with ease.
      </p>
    ),
    recipient: false
  }]

  const scratchSurfaceConversation = [{
    displayPicture: head3Svg,
    name: 'Employee',
    body: (
      <p className={css(mss.reg)}>
        None of my friends are currently looking for a job.
      </p>
    ),
    recipient: true
  }, {
    displayPicture: headNudjSvg,
    name: 'nudj',
    body: (
      <div>
        <p className={css(mss.reg)}>
          Most referral schemes focus on introducing active candidates.
        </p>
        <p className={css(mss.reg, mss.mtReg)}>
          nudj helps your teams search beyond their immediate networks.
          Using our tailored ‘Aided Recall’ approach we help them dig deeper
          into their personal networks.
        </p>
      </div>
    ),
    recipient: false
  }]

  const adminNightmareConversation = [{
    displayPicture: head4Svg,
    name: 'Employee',
    body: (
      <p className={css(mss.reg)}>
        I’ve recommended people in the past but my referrals get lost in
        the system.
      </p>
    ),
    recipient: true
  }, {
    displayPicture: headNudjSvg,
    name: 'nudj',
    body: (
      <p className={css(mss.reg)}>
        Keep your referred candidates out of your inbox. Follow up and track
        conversations with candidates and referrers from within the platform.
      </p>
    ),
    recipient: false
  }]

  return {
    poorlyCommunicatedConversation,
    tooMuchWorkConversation,
    scratchSurfaceConversation,
    adminNightmareConversation
  }
}

const RandomHoverButton = ({ style, ...props }) => {
  return (
    <RandomHover
      render={({ style: hoverStyle, ...hoverProps }) => (
        <Link
          style={[style, hoverStyle]}
          {...hoverProps}
          {...props}
        />
      )}
    />
  )
}

const HomePage = (props) => {
  const pageTitle = `Better manage your employee referral scheme and hire more great people`
  const pageDescription = `nudj makes it effortless for you and your team to ask for, track, and reward referrals.`
  const hireUrl = `${props.app.hire.protocol}://${props.app.hire.hostname}/welcome`

  const {
    poorlyCommunicatedConversation,
    tooMuchWorkConversation,
    scratchSurfaceConversation,
    adminNightmareConversation
  } = getConversations()

  return (
    <Page {...props} className={style.root}>
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
      <Navigation />
      <div className={css(style.wrapper)}>
        <header className={css(style.header)}>
          <div className={css(style.headerContent)}>
            <h1 className={css(style.title, mss.fgPrimary)}>
              Hiring sucks.<br />
              <span className={css(mss.fgMidRed)}>Referrals are the answer.</span>
            </h1>
            <p className={css(style.subtitle, mss.reg, mss.mtReg)}>
              nudj will help you build a ‘best in class’ employee referral
              program that will consistently deliver results: top talent,
              reduced time to hire and major savings.
            </p>
            <div className={css(style.ctaGroup)}>
              <RandomHoverButton
                href={hireUrl}
                style={style.cta}
                volume='cheer'
              >
                Try it free
              </RandomHoverButton>
              <RandomHoverButton
                href='mailto:robyn@nudj.co'
                style={style.cta}
              >
                Request a demo
              </RandomHoverButton>
            </div>
          </div>
        </header>
        <Section style={style.section}>
          <h2 className={css(style.sectionH1, mss.fgPrimary)}>
            <span className={css(style.underlineBgWhite, style.whatToExpectUnderline)}>
              What to expect with nudj
            </span>
          </h2>
          <p className={css(mss.reg, mss.mtReg, style.sectionSubtitle)}>
            Combine our software with Greenhouse, Workable or any ATS to get
            more of the candidates you need.
          </p>
          <dl className={css(style.statistics)}>
            <div className={css(style.statisticContainer)}>
              <dt>
                <Statistic style={style.statistic}>85%</Statistic>
                <h3 className={css(style.sectionH2, mss.fgPrimary, mss.mtReg)}>
                  Applicants interviewed
                </h3>
              </dt>
              <dd className={css(style.statisticDescription)}>
                Not only are nudj applicants high quality, but they also come
                vouched for, meaning the only sensible option is to interview them.
              </dd>
            </div>
            <div className={css(style.statisticContainer)}>
              <dt>
                <Statistic style={[style.statistic, style.statistic2]}>2x</Statistic>
                <h3 className={css(style.sectionH2, mss.fgPrimary, mss.mtReg)}>
                  Faster to hire
                </h3>
              </dt>
              <dd className={css(style.statisticDescription)}>
                On average it takes 1 month to hire a candidate through nudj,
                compared to almost 2 months when using a recruiter.
              </dd>
            </div>
            <div className={css(style.statisticContainer)}>
              <dt>
                <Statistic style={[style.statistic, style.statistic3]}>66%</Statistic>
                <h3 className={css(style.sectionH2, mss.fgPrimary, mss.mtReg)}>
                  Cheaper than a recruiter
                </h3>
              </dt>
              <dd className={css(style.statisticDescription)}>
                With even the cheapest recruiters charging 15% and costly job
                board subscriptions not delivering, we offer better value for money.
              </dd>
            </div>
          </dl>
        </Section>
        <Section style={style.section} backgroundColor='greyLightest'>
          <h2 className={css(style.sectionH1, mss.fgPrimary)}>
            <span className={css(style.underlineBgGrey, style.clientsIncludeUnderline)}>
              Our clients include
            </span>
          </h2>
          <ClientGrid style={style.clientGrid} />
          <Blockquote
            style={style.quote}
            citation={(
              <Citation
                style={style.citation}
                image={benImage}
                name='Ben Gardener'
                position='Direction of Customer Success'
                logo={dittoSvg}
              />
            )}
          >
            When you are looking for people who aren’t just after a job but
            also share our vision to save the planet, referrals are the only
            option. Candidates sourced via nudj were higher calibre than
            anything we’ve used before.
          </Blockquote>
        </Section>
        <Section style={style.section}>
          <h2 className={css(style.sectionH1, mss.fgPrimary)}>
            <span className={css(style.underlineBgWhite, style.businessScenarioTopUnderline)}>
              We already have a referral
            </span>{' '}
            <span className={css(style.underlineBgWhite, style.businessScenarioBottomUnderline)}>
              scheme so why do we need nudj?
            </span>
          </h2>
          <section className={css(style.scenario)}>
            <h3 className={css(style.sectionH2, mss.fgPrimary)}>
              Referral schemes are poorly communicated and aren’t personalised
              to the individual…
            </h3>
            <Conversation conversation={poorlyCommunicatedConversation} style={mss.mtLgIi} />
          </section>
          <section className={css(style.scenario)}>
            <h3 className={css(style.sectionH2, mss.fgPrimary)}>
              Referral schemes involve too much work for the referrer and
              candidate…
            </h3>
            <Conversation conversation={tooMuchWorkConversation} style={mss.mtLgIi} />
          </section>
          <section className={css(style.scenario)}>
            <h3 className={css(style.sectionH2, mss.fgPrimary)}>
              Most schemes only scratch the surface…
            </h3>
            <Conversation conversation={scratchSurfaceConversation} style={mss.mtLgIi} />
          </section>
          <section className={css(style.scenario)}>
            <h3 className={css(style.sectionH2, mss.fgPrimary)}>
              Referrals are an admin nightmare…
            </h3>
            <Conversation conversation={adminNightmareConversation} style={mss.mtLgIi} />
          </section>
        </Section>
        <Section style={style.section} backgroundColor='midRed'>
          <h2 className={css(style.sectionH1, mss.fgWhite)}>
            Our pricing
          </h2>
          <p className={css(mss.reg, mss.mtReg, mss.fgWhite, style.sectionSubtitle)}>
            Unlimited jobs. Unlimited users. One monthly fee.
          </p>
          <WobblyBox backgroundColor='white' style={style.pricingBox}>
            <strong className={css(mss.lgIi, mss.bold, mss.fgWhite)}>$99/month</strong>
            <p className={css(mss.reg, mss.mtReg, mss.fgWhite)}>
              14-day free trial. No payment details needed.
            </p>
          </WobblyBox>
          <div className={css(style.ctaGroup, style.pricingCtaGroup)}>
            <RandomHoverButton
              href={hireUrl}
              style={style.cta}
              volume='cheer'
            >
              Try it free
            </RandomHoverButton>
            <RandomHoverButton
              href='mailto:robyn@nudj.co'
              style={style.cta}
            >
              Request a demo
            </RandomHoverButton>
          </div>
        </Section>
      </div>
    </Page>
  )
}

module.exports = HomePage
