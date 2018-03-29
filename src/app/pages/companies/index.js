const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')
const RandomHover = require('../../components/random-hover')
const JobCard = require('../../components/job-card')

const CompanyPage = props => {
  const company = get(props, 'company')
  const pageTitle = `Jobs at ${company.name}`
  const pageDescription = `${company.description}`

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
        location='/companies/:companySlug'
      />
      <section className={style.hero}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h1 className={style.heroTitle}>Join the {company.name} family. They love talented people.</h1>
          </AnimateAppearance>
        </div>
      </section>
      <section className={style.secondaryHero}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.secondaryHeroTitle}>About</h2>
            <p className={style.secondaryHeroCopy}>{company.description}</p>
          </AnimateAppearance>
        </div>
      </section>
      <section className={style.jobsSection}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.jobsTitle}>Jobs</h2>
          </AnimateAppearance>
        </div>
        <section className={style.jobsContainer} from='bottom'>
          {company.jobs.length > 0 ? (
            <ul className={style.jobs}>
              {company.jobs.map((job) => {
                const url = `/companies/${company.slug}/jobs/${job.slug}`
                return (
                  <li className={style.job} key={job.slug}>
                    <JobCard
                      jobHref={url}
                      title={job.title}
                      salary={job.remuneration}
                      location={job.location}
                    />
                  </li>
                )
              })}
            </ul>
        ) : (
          <div className={style.cta}>
            <p className={style.bodyCopy}>There aren&apos;t any open jobs at {company.name} right now,
            but if you sign-up for updates we&apos;ll let you know as soon as there are.</p>
            <RandomHover><Link to='/signup' className={style.signupButton} id='signUp'>Sign up</Link></RandomHover>
          </div>
        )}
        </section>
      </section>
    </Page>
  )
}

module.exports = CompanyPage
