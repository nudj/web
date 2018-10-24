/* global window */

const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const { merge } = require('@nudj/library')
const { Button, Link } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const style = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const NudjSuccess = require('../../components/nudj-success')
const RandomHoverButton = require('../../components/random-hover-button')
const JobCard = require('../../components/job-card')
const { render } = require('../../lib/templater')

function determineArticle (subject) {
  const consonantSound = /^one(![ir])/i
  const vowelSound = /^[aeio]|^u([aeiou]|[^n][^aeiou]|ni[^dmnl]|nil[^l])/i
  if (!consonantSound.test(subject) && vowelSound.test(subject)) {
    return 'an'
  }
  return 'a'
}

const Job = props => {
  const company = get(props, 'company', {})
  const allJobs = get(company, 'jobs')
  const job = get(company, 'job', {})
  const referral = get(props, 'referral')
  const companyName = get(company, 'name', '')
  const jobTitle = get(job, 'title', '')
  const candidateDescription = get(job, 'candidateDescription', '')
  const companyDescription = get(company, 'description', '')
  const roleDescription = get(job, 'roleDescription', '')
  const image = get(company, 'logo')
  const application = get(job, 'application')
  const templates = get(props, 'templates')
  const pageTitle = `${jobTitle} at ${companyName}`
  const pageDescription = `Apply to be a ${jobTitle} at ${companyName} or share the opportunity with a friend and get rewarded if they get hired.`
  const userCompanySlug = get(props, 'user.company.slug')

  const relatedJobs = allJobs.filter(relatedJob => relatedJob.id !== job.id)

  const uniqueLink = `/companies/${get(company, 'slug', '')}/jobs/${get(job, 'slug', '')}`
  const queryString = referral ? `?referralId=${referral.id}` : ''

  const companiesLink = `/companies/${get(company, 'slug', '')}`

  const applyForJobButton = application ? (
    <Button style={style.button} volume='cheer' id='applyButton' disabled>
      You&apos;ve already applied
    </Button>
  ) : (
    <Link
      href={`${uniqueLink}/apply${queryString}`}
      style={style.button}
      volume='cheer'
      id='applyButton'
    >
      Apply for job
    </Link>
  )

  const data = {
    job: merge(job, {
      tags: get(job, 'tags', []).shift() // Grab only first tag
    }),
    company
  }

  // Double check if we need to modify the article for the job title in templates.title
  const jobTitleArticle = determineArticle(data.job.title)
  templates.title = templates.title.replace(
    /an?\s\{\{job.title\}\}/g,
    `${jobTitleArticle} {{job.title}}`
  )

  const title = render({
    template: templates.title,
    data: data,
    tagify: (contents, ok, index, chunk) => {
      if (chunk === 'job.company.name' && data && data.company.url) {
        return (
          <a
            className={css(style.jobHeaderTitleHighlightLink)}
            key={`chunk${index}`}
            href={data.company.url}
            target='_blank'
          >
            {contents}
          </a>
        )
      } else if (chunk === 'job.title' && data && data.job.url) {
        return (
          <a
            className={css(style.jobHeaderTitleHighlightLink)}
            key={`chunk${index}`}
            href={data.job.url}
            target='_blank'
          >
            {contents}
          </a>
        )
      }
      return (
        <span className={css(style.jobHeaderTitleHighlight)} key={`chunk${index}`}>
          {contents}
        </span>
      )
    }
  })

  const description = render({
    template: templates.description,
    data: data
  })

  const bannerMessage = get(props, 'message')
  const isReferrerByProps = !!get(job, 'referral')
  const isReferrerByMessage =
    bannerMessage &&
    bannerMessage.type === 'error' &&
    bannerMessage.code === 403 &&
    bannerMessage.message === 'You\'ve already shared this job'

  const actions = []
  const apply = (
    <div className={css(style.action)}>
      {applyForJobButton}
      <p className={css(style.actionCopy)}>
        It takes 2 seconds &amp; you don&apos;t need a CV!
      </p>
    </div>
  )

  actions.push(apply)

  const bonusAmount = get(job, 'bonus')
  const nudjCopy = userCompanySlug === company.slug ? (
    <p className={css(style.actionCopy)}>
      You’ll get{' '}
      <strong className={css(style.strong)}>
        {bonusAmount}
      </strong>{' '}
      if they get the job.
    </p>
  ) : (
    <p className={css(style.actionCopy)}>
      Know someone perfect? Sign up to share this job with them.
    </p>
  )

  if (isReferrerByProps || isReferrerByMessage) {
    const nudjLink = (
      <NudjSuccess {...props} />
    )
    const nudjd = (
      <div className={css(style.action)}>
        {nudjLink}
        {nudjCopy}
      </div>
    )
    actions.unshift(nudjd)
  } else {
    const nudjForm = (
      <form
        className={css(style.action)}
        action={`${uniqueLink}/nudj${queryString}`}
        method='POST'
      >
        <input type='hidden' name='_csrf' value={get(props, 'csrfToken')} />
        <Button style={style.button} volume='cheer' id='nudjButton' type='submit'>
          Send to a friend
        </Button>
        {nudjCopy}
      </form>
    )
    actions.push(nudjForm)
  }

  let relatedJobsList = ''
  if (relatedJobs.length) {
    relatedJobsList = (
      <section className={css(style.related)}>
        <h2 className={css(style.relatedTitle)}>Other positions</h2>
        <ul className={css(style.list)}>
          {relatedJobs.map((related) => {
            const url = `/companies/${company.slug}/jobs/${related.slug}`
            return (
              <li className={css(style.relatedJob)} key={related.title.split(' ').join('-')}>
                <JobCard
                  jobHref={url}
                  title={related.title}
                  salary={related.remuneration}
                  location={related.location}
                />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const descriptionSections = []
  if (companyDescription) {
    descriptionSections.push([`Who are ${companyName}?`, companyDescription])
  }
  if (roleDescription) {
    descriptionSections.push([
      `What does a ${jobTitle} at ${companyName} do?`,
      roleDescription
    ])
  }
  if (candidateDescription) {
    descriptionSections.push([
      'Does this sound like you?',
      candidateDescription
    ])
  }

  const fullJobDescription = (
    <div>
      <div className={css(style.jobDescriptionBox)}>
        {descriptionSections.map(section => (
          <div
            className={css(style.jobDescriptionSection)}
            key={section[0].split(' ').join('-')}
          >
            <div className={css(style.jobDescriptionSubtitle)}>{section[0]}</div>
            <div className={css(style.jobDescriptionText)}>{section[1]}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const jobDescriptionFallback = (
    <div className={css(style.jobDescriptionContainer)}>
      <h3 className={css(style.jobDescriptionSubtitleFallback)}>
        About {company.name}
      </h3>
      <p className={css(style.jobDescriptionFallback)}>{companyDescription}</p>
      <h3 className={css(style.jobDescriptionSubtitleFallback)}>
        About the role
      </h3>
      <p className={css(style.jobDescriptionFallback)}>{description}</p>
    </div>
  )

  const expandedDescription = !!(roleDescription && candidateDescription)
  const jobDescription = expandedDescription ? fullJobDescription : jobDescriptionFallback
  const titleStyle = expandedDescription ? style.expandedJobHeaderTitle : style.jobHeaderTitle

  return (
    <Page {...props}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='title' content={pageTitle} />
        <meta name='description' content={pageDescription} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={image} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDescription} />
        <meta name='twitter:image' content={image} />
      </Helmet>
      <Header location={props.location.pathname} />
      {job.status === 'ARCHIVED' && (
        <section className={css(style.jobDeadContainer)}>
          <div className={css(style.jobDeadNotice)}>
            <h2 className={css(style.jobDeadTitle)}>Unfortunately, this job is no longer available</h2>
            <p className={css(style.jobDeadCopy)}>
              Head over to their company page to see what open roles {company.name} currently have.
            </p>
            <RandomHoverButton href={companiesLink} style={style.button} volume='cheer'>
              Go to company page
            </RandomHoverButton>
          </div>
        </section>
      )}
      <div className={css(style.job)}>
        <div className={css(style.jobContainer)}>
          <h1 className={css(titleStyle)}>{title}</h1>
          {jobDescription}
        </div>
        {job.status !== 'ARCHIVED' && (
          <section className={css(style.actions)}>
            {actions[1]}
            <span className={css(style.or)}>or</span>
            {actions[0]}
          </section>
        )}
      </div>
      {relatedJobsList}
    </Page>
  )
}

module.exports = Job
