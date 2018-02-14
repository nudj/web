const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')

const companyPage = props => {
  const company = get(props, 'company')
  const pageTitle = `Jobs at ${company.name}`

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
        location='/companies/:companySlug' />
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
            <h2 className={style.bodyTitle}>Jobs</h2>
          </AnimateAppearance>
        </div>
        <AnimateAppearance className={style.jobsContainer} from='bottom'>
          <ul className={style.jobs}>
            {company.jobs.map((job) => {
              const url = `/jobs/${company.slug}+${job.slug}`

              return (
                <li className={style.job}>
                  <p className={style.jobTitle}>{job.title}</p>
                  <Link to={url} className={style.jobLink}>View job ></Link>
                </li>
              )
            })}
          </ul>
        </AnimateAppearance>
      </section>
    </Page>
  )
}

module.exports = companyPage
