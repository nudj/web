/* global window */

const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const { getStyle } = require('./style.css')

const Page = require('../../components/page')
const Header = require('../../components/header')
const NudjSuccess = require('../../components/nudj-success')
const RandomHover = require('../../components/random-hover')
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
  return (event) => {
    const target = event.target
    const Intercom = window.Intercom
    event.preventDefault()
    if (!target.querySelector('#visitorId')) {
      const string = `<input id='visitorId' type='hidden' name='_intercom_visitor_id' value='${Intercom && Intercom('getVisitorId')}' />`
      target.appendChild(elementFromString(string))
    }
    let meta = {
      jobTitle: get(props, 'job.title'),
      company: get(props, 'job.company.name'),
      referrerName: get(props, 'referrer.name'),
      referrerId: get(props, 'referrer.id')
    }
    if (eventType === 'new-application') {
      meta.profileUrl = get(props, 'person.url')
    }
    Intercom && Intercom('trackEvent', eventType, meta)
    target.submit()
    return false
  }
}

const Job = (props) => {
  const referral = get(props, 'referral')
  const companyName = get(props, 'job.company.name', '')
  const jobTitle = get(props, 'job.title', '')
  const candidateDescription = get(props, 'job.candidateDescription', '')
  const companyDescription = get(props, 'job.company.description', '')
  const roleDescription = get(props, 'job.roleDescription', '')
  const image = get(props, 'job.company.logo')
  const application = get(props, 'job.application')
  const templates = get(props, 'templates')
  const pageTitle = `${companyName} - ${jobTitle}`

  const style = getStyle()

  const applyForJobButton = application ? (<button className={style.applied} disabled>We'll be in touch soon</button>) : (<RandomHover><button className={style.apply}>Apply</button></RandomHover>)

  const uniqueLink = `/jobs/${get(props, 'job.company.slug', '')}+${get(props, 'job.slug', '')}${referral ? `+${referral.id}` : ''}`

  const data = {
    job: get(props, 'job'),
    company: get(props, 'job.company')
  }

  // Double check if we need to modify the article for the job title in templates.title
  const jobTitleArticle = determineArticle(data.job.title)
  templates.title = templates.title.replace(/an?\s\{\{job.title\}\}/g, `${jobTitleArticle} {{job.title}}`)

  const title = render({
    template: templates.title,
    data: data,
    tagify: (contents, ok, index, chunk) => {
      if (chunk === 'job.company.name' && data && data.job.company.url) {
        return <a className={style.jobHeaderTitleHighlightLink} key={`chunk${index}`} href={data.job.company.url} target='_blank'>{contents}</a>
      } else if (chunk === 'job.title' && data && data.job.url) {
        return <a className={style.jobHeaderTitleHighlightLink} key={`chunk${index}`} href={data.job.url} target='_blank'>{contents}</a>
      }
      return <span className={style.jobHeaderTitleHighlight} key={`chunk${index}`}>{contents}</span>
    }
  })

  const bannerMessage = get(props, 'message')
  const isReferrerByProps = !!get(props, 'job.referral')
  const isReferrerByMessage = bannerMessage && bannerMessage.type === 'error' && bannerMessage.code === 403 && bannerMessage.message === 'Already referred'

  const actions = []
  const apply = (<form className={style.action} action={`${uniqueLink}/apply`} method='POST' onSubmit={onFormSubmit('new-application', props)}>
    <input type='hidden' name='_csrf' value={props.csrfToken} />
    {applyForJobButton}
    <p className={style.actionCopy}>Sign up &amp; we'll send you some info!</p>
  </form>)

  actions.push(apply)

  // AWFUL HACK AHEAD
  const companySlug = get(props, 'company.slug')
  const jobSlug = get(props, 'job.slug')
  const dollarJobs = ['marketing-coordinator'] // add jobs with bonuses in dollars to this array
  const bonusCurrency = (companySlug === 'sales-i' && dollarJobs.includes(jobSlug)) ? '$' : '£'
  // END AWFUL HACK

  const bonusAmount = get(props, 'job.bonus')

  const nudjCopy = (<p className={style.actionCopy}>We’ll give you <strong className={style.strong}>{bonusCurrency}{bonusAmount}</strong> if they get the job.</p>)

  if (isReferrerByProps || isReferrerByMessage) {
    const nudjLink = (<NudjSuccess {...props} referral={get(props, 'job.referral')} />)
    const nudjd = (<div className={style.action}>
      {nudjLink}
      {nudjCopy}
    </div>)
    actions.unshift(nudjd)
  } else {
    const nudjButton = (<RandomHover><button className={style.nudj}>Send to a friend</button></RandomHover>)
    const nudjForm = (<form className={style.action} action={`${uniqueLink}/nudj`} method='POST' onSubmit={onFormSubmit('new-referral', props)}>
      <input type='hidden' name='_csrf' value={props.csrfToken} />
      {nudjButton}
      {nudjCopy}
    </form>)
    actions.push(nudjForm)
  }

  const relatedJobs = get(props, 'job.relatedJobs', [])
  let relatedJobsList = ''
  if (relatedJobs.length) {
    relatedJobsList = (
      <section className={style.related}>
        <h2 className={style.relatedTitle}>Other positions</h2>
        <ul className={style.list}>
          {relatedJobs.map((related) => <li className={style.relatedJob} key={related.title.split(' ').join('-')}>
            <Link className={style.blockLink} to={`/jobs/${related.company.slug}+${related.slug}`}>
              <p className={style.jobTitle}>{related.title} @ <span className={style.relatedCompany}>{related.company.name}</span></p>
              <span className={style.bodyLinks}>View job ></span>
            </Link>
          </li>)}
        </ul>
      </section>
    )
  }

  let descriptionElement
  const toggleButtonText = props.jobPage.showDescription ? 'Less -' : 'Find out more +'
  const transitionStyle = props.jobPage.showDescription ? { height: props.jobPage.transitionHeight, opacity: 1 } : { height: 0, opacity: 0 }
  const toggleBox = () => props.dispatch(toggleDescriptionBox(descriptionElement.clientHeight))
  const JobDescription = (
    <div className={style.jobDescriptionBox} style={transitionStyle}>
      <div ref={element => { descriptionElement = element }}>
        <div className={style.jobDescriptionSection}>
          <div className={style.jobHeaderSubtitle}>{`Who are ${companyName}?`}</div>
          <div className={style.jobAnswerColumn}>{companyDescription}</div>
        </div>
        <div className={style.jobDescriptionSection}>
          <div className={style.jobHeaderSubtitle}>{`What does a ${jobTitle} at ${companyName} do?`}</div>
          <div className={style.jobAnswerColumn}>{roleDescription}</div>
        </div>
        <div className={style.jobDescriptionSection}>
          <div className={style.jobHeaderSubtitle}>Does this sound like you?</div>
          <div className={style.jobAnswerColumn}>{candidateDescription}</div>
        </div>
      </div>
    </div>
  )

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
        <div className={style.jobHeader}>
          <h1 className={style.jobHeaderTitle}>{title}</h1>
          {JobDescription}
          <div className={style.toggleDescriptionButtonContainer}>
            <div className={style.collapseBoxLineLeft} />
            <span className={style.toggleButton} onClick={toggleBox}>{toggleButtonText}</span>
            <div className={style.collapseBoxLineRight} />
          </div>
        </div>
        <section className={style.actions}>
          {actions[0]}
          <span className={style.or}>or</span>
          {actions[1]}
        </section>
      </div>
      {relatedJobsList}
    </Page>
  )
}

module.exports = Job
