/* global Intercom */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { getStyle, setStyles } from './job-page.css'

import Header from '../header'

function elementFromString (string) {
  var div = document.createElement('div')
  div.innerHTML = string
  return div.childNodes[0]
}

function onFormSubmit (eventType, props) {
  return (event) => {
    let target = event.target
    event.preventDefault()
    if (!target.querySelector('#visitorId')) {
      const string = `<input id='visitorId' type='hidden' name='_intercom_visitor_id' value='${Intercom('getVisitorId')}' />`
      target.appendChild(elementFromString(string))
    }
    let meta = {
      jobTitle: get(props, 'job.title'),
      company: get(props, 'company.name'),
      referrerName: get(props, 'referrer.name'),
      referrerId: get(props, 'referrer.id')
    }
    if (eventType === 'new-application') {
      meta.profileUrl = get(props, 'person.url')
    }
    Intercom('trackEvent', eventType, meta)
    target.submit()
    return false
  }
}

const Component = (props) => {
  const referral = get(props, 'referral')
  const companyName = get(props, 'company.name', '')
  const jobTitle = get(props, 'job.title', '')
  const image = get(props, 'company.logo')
  const application = get(props, 'application')

  const pageTitle = `${companyName} - ${jobTitle}`

  const prismic = {
    title: `Like Harry Potter after the golden snitch, ${companyName} are seeking a ${jobTitle}.`,
    description: 'They’re based in {{job.location}} and the salary is {{job.salary}}. Also they need someone with {{job.experience}} experience and a track record of {{job.requirements}}.',
    colourPrimary: 'darkPink',
    colourText: 'white',
    colourTextHighlight: 'royalBlue'
  }

  setStyles(prismic.colourPrimary, prismic.colourText, prismic.colourTextHighlight)
  const style = getStyle()

  const applyForJobButton = application ? (<button className={style.applied} disabled>You've already applied</button>) : (<button className={style.apply}>Apply for job</button>)

  const uniqueLink = `/jobs/${get(props, 'company.slug', '')}+${get(props, 'job.slug', '')}${referral ? `+${referral.id}` : ''}`

  return (
    <div className={style.body}>
      <Header
        backgroundColour={prismic.colourPrimary}
        textColour={prismic.colourText}
        textHighlightColour={prismic.colourTextHighlight} />
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
          <h1 className={style.jobHeaderTitle}>{prismic.title}</h1>
          <h3 className={style.jobHeaderSubtitle}>What else you need to know…</h3>
          <p className={style.jobHeaderDescription}>{prismic.description}</p>
        </div>
        <section className={style.actions}>
          <form className={style.action} action={`${uniqueLink}/apply`} method='POST' onSubmit={onFormSubmit('new-application', props)}>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            {applyForJobButton}
            <p className={style.actionCopy}>It only takes a <strong className={style.strong}>few seconds to apply!</strong></p>
          </form>
          <form className={style.action} action={`${uniqueLink}/nudj`} method='POST' onSubmit={onFormSubmit('new-referral', props)}>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            <button className={style.nudj}>Send to a friend</button>
            <p className={style.actionCopy}>We’ll <strong className={style.strong}>give you £{get(props, 'job.bonus')} if they get the job.</strong> Simply sign up &amp; we'll give you a unique link to this page, which you can share.</p>
          </form>
        </section>
      </div>
      <section className={style.related}>
        <h2 className={style.relatedTitle}>Other positions</h2>
        <ul className={style.list}>
          {get(props, 'job.related', []).map((related) => <li className={style.relatedJob} key={related.title.split(' ').join('-')}>
            <p className={style.jobTitle}>{related.title} @ <span className={style.red}>{related.companyName}</span></p>
            <a className={style.bodyLinks} href={`/jobs/${related.companySlug}+${related.slug}`}>View job ></a>
          </li>)}
        </ul>
      </section>
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
