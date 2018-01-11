/* global window */

const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { merge } = require('@nudj/library')
const { Helmet } = require('react-helmet')
const { getStyle, setStyles } = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const NudjSuccess = require('../../components/nudj-success')
const RandomHover = require('../../components/random-hover')
const CollapseBox = require('../../components/collapse-box')
const { toggleDescriptionBox } = require('./actions')

const { render } = require('../../lib/templater')

function elementFromString (string) {
  var div = document.createElement('div')
  div.innerHTML = string
  return div.childNodes[0]
}

function determineArticle (subject) {
  const consonantSound = /^one(![ir])/i
  const vowelSound = /^[aeio]|^u([aeiou]|[^n][^aeiou]|ni[^dmnl]|nil[^l])/i
  if (!consonantSound.test(subject) && vowelSound.test(subject)) {
    return 'an'
  }
  return 'a'
}

function onFormSubmit (eventType, props) {
  const company = get(props, 'company')
  const job = get(company, 'job')
  return event => {
    const target = event.target
    const Intercom = window.Intercom || (() => {})
    event.preventDefault()
    if (!target.querySelector('#visitorId')) {
      const string = `<input id='visitorId' type='hidden' name='_intercom_visitor_id' value='${Intercom(
        'getVisitorId'
      )}' />`
      target.appendChild(elementFromString(string))
    }
    let meta = {
      jobTitle: get(job, 'title'),
      company: get(company, 'name'),
      referrerName: get(props, 'referrer.name'),
      referrerId: get(props, 'referrer.id')
    }
    if (eventType === 'new-application') {
      meta.profileUrl = get(props, 'person.url')
      Intercom('update', {
        lastJobAppliedFor: `${meta.jobTitle} at ${meta.company}`
      })
    } else {
      Intercom('update', {
        lastJobReferredFor: `${meta.jobTitle} at ${meta.company}`
      })
    }
    Intercom('trackEvent', eventType, meta)
    target.submit()
    return false
  }
}

const Job = props => {
  const company = get(props, 'company', {})
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
  const pageTitle = `${companyName} - ${jobTitle}`

  setStyles()
  const style = getStyle()

  const applyForJobButton = application ? (
    <button className={style.applied} disabled id='applyButton'>
      You've already applied
    </button>
  ) : (
    <RandomHover>
      <button className={style.apply} id='applyButton'>Apply for job</button>
    </RandomHover>
  )

  const uniqueLink = `/jobs/${get(company, 'slug', '')}+${get(job, 'slug', '')}${referral ? `+${referral.id}` : ''}`

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
            className={style.jobHeaderTitleHighlightLink}
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
            className={style.jobHeaderTitleHighlightLink}
            key={`chunk${index}`}
            href={data.job.url}
            target='_blank'
          >
            {contents}
          </a>
        )
      }
      return (
        <span className={style.jobHeaderTitleHighlight} key={`chunk${index}`}>
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
    <form
      className={style.action}
      action={`${uniqueLink}/apply`}
      method='POST'
      onSubmit={onFormSubmit('new-application', props)}
    >
      <input type='hidden' name='jobId' value={get(job, 'id')} />
      <input type='hidden' name='_csrf' value={get(props, 'csrfToken')} />
      {applyForJobButton}
      <p className={style.actionCopy}>
        It takes 2 seconds &amp; you don't need a CV!
      </p>
    </form>
  )

  actions.push(apply)

  // AWFUL HACK AHEAD
  const companySlug = get(company, 'slug')
  const jobSlug = get(job, 'slug')
  const dollarJobs = ['marketing-coordinator'] // add jobs with bonuses in dollars to this array
  const bonusCurrency =
    companySlug === 'sales-i' && dollarJobs.includes(jobSlug) ? '$' : '£'
  // END AWFUL HACK

  const bonusAmount = get(job, 'bonus')

  const nudjCopy = (
    <p className={style.actionCopy}>
      You’ll get{' '}
      <strong className={style.strong}>
        {bonusCurrency}
        {bonusAmount}
      </strong>{' '}
      if they get the job.
    </p>
  )

  if (isReferrerByProps || isReferrerByMessage) {
    const nudjLink = (
      <NudjSuccess {...props} />
    )
    const nudjd = (
      <div className={style.action}>
        {nudjLink}
        {nudjCopy}
      </div>
    )
    actions.unshift(nudjd)
  } else {
    const nudjButton = (
      <RandomHover>
        <button className={style.nudj} id='nudjButton'>
          Send to a friend
        </button>
      </RandomHover>
    )
    const nudjForm = (
      <form
        className={style.action}
        action={`${uniqueLink}/nudj`}
        method='POST'
        onSubmit={onFormSubmit('new-referral', props)}
      >
        <input type='hidden' name='jobId' value={get(job, 'id')} />
        <input type='hidden' name='_csrf' value={get(props, 'csrfToken')} />
        {nudjButton}
        {nudjCopy}
      </form>
    )
    actions.push(nudjForm)
  }

  const relatedJobs = get(job, 'relatedJobs', [])
  let relatedJobsList = ''
  if (relatedJobs.length) {
    relatedJobsList = (
      <section className={style.related}>
        <h2 className={style.relatedTitle}>Other positions</h2>
        <ul className={style.list}>
          {relatedJobs.map(related => (
            <li
              className={style.relatedJob}
              key={related.title.split(' ').join('-')}
            >
              <Link
                className={style.blockLink}
                to={`/jobs/${related.company.slug}+${related.slug}`}
              >
                <p className={style.jobTitle}>
                  {related.title} @{' '}
                  <span className={style.relatedCompany}>
                    {related.company.name}
                  </span>
                </p>
                <span className={style.bodyLinks}>View job ></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const toggleBox = () => props.dispatch(toggleDescriptionBox())
  const toggleButtonText = props.jobPage.showDescription
    ? 'Less -'
    : 'Find out more +'

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
    <div className={style.jobDescriptionContainer}>
      <CollapseBox isOpened={props.jobPage.showDescription}>
        <div className={style.jobDescriptionBox}>
          {descriptionSections.map(section => (
            <div
              className={style.jobDescriptionSection}
              key={section[0].split(' ').join('-')}
            >
              <div className={style.jobDescriptionSubtitle}>{section[0]}</div>
              <div className={style.jobDescriptionText}>{section[1]}</div>
            </div>
          ))}
        </div>
      </CollapseBox>
      <div className={style.toggleDescriptionButtonContainer}>
        <div className={style.collapseBoxLineLeft} />
        <span
          className={style.toggleButton}
          id='toggleInformation'
          onClick={toggleBox}
        >
          {toggleButtonText}
        </span>
        <div className={style.collapseBoxLineRight} />
      </div>
    </div>
  )

  const jobDescriptionFallback = (
    <div className={style.jobDescriptionContainer}>
      <h3 className={style.jobDescriptionSubtitleFallback}>
        What else you need to know…
      </h3>
      <p className={style.jobDescriptionFallback}>{description}</p>
    </div>
  )

  // > 1 ensures that the fallback renders if no additional entries are provided
  // To render the collapse box it needs to be > 1 because company.description will always be in there as 1 entry.
  const jobDescription =
    descriptionSections.length > 1 ? fullJobDescription : jobDescriptionFallback

  return (
    <Page {...props} className={style.body}>
      <Header />
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='title' content={pageTitle} />
        <meta property='og:title' content={pageTitle} />
        <meta property='twitter:title' content={pageTitle} />
        <meta property='twitter:image' content={image} />
        <meta property='og:image' content={image} />
      </Helmet>
      <div className={style.job}>
        <div className={style.jobContainer}>
          <h1 className={style.jobHeaderTitle}>{title}</h1>
          {jobDescription}
        </div>
        <section className={style.actions}>
          {actions[1]}
          <span className={style.or}>or</span>
          {actions[0]}
        </section>
      </div>
      {relatedJobsList}
    </Page>
  )
}

module.exports = Job
