const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')
const RandomHover = require('../../components/random-hover')

const CompanyPage = props => {
  const company = get(props, 'company')
  const pageTitle = `Jobs at ${company.name} - nudj`

  const style = getStyle()

  return (
    <Page {...props} className={style.body}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='title' content={pageTitle} />
        <meta property='og:title' content={pageTitle} />
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
        <AnimateAppearance className={style.jobsContainer} from='bottom'>
          {company.jobs.length > 0 ? (
            <ul className={style.jobs}>
              {company.jobs.map((job) => {
                const url = `/companies/${company.slug}/jobs/${job.slug}`

                return (
                  <li className={style.job} key={job.slug}>
                    <p className={style.jobTitle}>{job.title}</p>
                    <Link to={url} className={style.jobLink}>View job ></Link>
                  </li>
                )
              })}
            </ul>
        ) : (
          <div className={style.cta}>
            <p className={style.bodySubtitle}>There aren&apos;t any open jobs at {company.name} right now,
            but if you sign-up for updates we&apos;ll let you know as soon as there are.</p>
            <RandomHover><Link to='/signup' className={style.signupButton} id='signUp'>Sign up</Link></RandomHover>
          </div>
        )}
        </AnimateAppearance>
      </section>
    </Page>
  )
}

module.exports = CompanyPage
