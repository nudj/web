const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')

const companyPage = props => {
  const company = get(props, 'company', {})
  const job = get(company, 'job', {})
  const companyName = get(company, 'name', '')
  const jobTitle = get(job, 'title', '')
  const companyDescription = get(company, 'description', '')
  const pageTitle = `${companyName}`

  const style = getStyle()

  return (
    <Page {...props} className={style.body}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='title' content={pageTitle} />
        <meta property='og:title' content={pageTitle} />
        <meta property='twitter:title' content={pageTitle} />
        <meta property='twitter:image' content={image} />
        <meta property='og:image' content={image} />
      </Helmet>
      <Header
        backgroundColour='midRed'
        textColour='white'
        textHighlightColour='royalBlue'
        location='/companies' />
      <section className={style.hero}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h1 className={style.heroTitle}>Join the {companyName} family. They love talented people.</h1>
            <p>{companyDescription}</p>
          </AnimateAppearance>
        </div>
      </section>
      <section className={style.jobsSection}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.bodyTitle}>Jobs at {companyName}</h2>
          </AnimateAppearance>
        </div>
        <AnimateAppearance from='bottom'>
          <ul className={style.jobs}>
            <li className={style.job}>
              <p className={style.jobTitle}>{jobTitle} @ <span className={style.red}>{companyName}</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
          </ul>
        </AnimateAppearance>
      </section>
    </Page>
  )
}

module.exports = companyPage
