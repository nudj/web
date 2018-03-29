const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const RandomHover = require('../../components/random-hover')
const JobCard = require('../../components/job-card')

const JobsPage = props => {
  const jobs = get(props, 'jobs')
  const pageTitle = `Search jobs on nudj`
  const pageDescription = `Search all the jobs that are currently live on nudj. Find your next move or share an opportunity with a friend.`

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
        location='/jobs'
      />
      <section className={style.hero}>
        <div className={style.header}>
          <h1 className={style.heroTitle}>There are <span className={style.highlight}>{jobs.length}</span> jobs on nudj. <br />Take your pick!</h1>
          <p className={style.bodyCopy}>Find your dream job or share one with a friend.</p>
        </div>
      </section>
      <section className={style.jobsSection}>
        <ul className={style.jobs}>
          {jobs.map(job => {
            const url = `/companies/${job.company.slug}/jobs/${job.slug}`
            const companyUrl = `/companies/${job.company.slug}`
            return (
              <li className={style.job} key={job.slug}>
                <JobCard
                  jobHref={url}
                  companyHref={companyUrl}
                  title={job.title}
                  company={job.company.name}
                  salary={job.remuneration}
                  location={job.location}
                />
              </li>
            )
          })}
        </ul>
        <div className={style.cta}>
          <div className={style.header}>
            <h2 className={style.secondaryTitle}>Get nudj’ed in your inbox</h2>
          </div>
          <p className={style.bodyCopy}>Sign-up and we’ll send you the latest jobs direct to your inbox.</p>
          <RandomHover><Link to='/signup' className={style.signupButton} id='signUp'>Sign up</Link></RandomHover>
        </div>
      </section>
    </Page>
  )
}

module.exports = JobsPage
