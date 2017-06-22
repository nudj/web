/* global Intercom */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { Helmet } from 'react-helmet'
import { getStyle, setStyles } from './job-page.css'

import Message from '../message'
import Header from '../header'
import NudjSuccess from '../nudj-success'

import { render } from '../../../lib/templater'
import PrismicReact from '../../../lib/prismic/react'

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

  const rawTemplate = get(props, 'template')
  const templateContent = new PrismicReact(rawTemplate)

  const template = {
    title: templateContent.fragmentToText({fragment: 'jobdescription.title'}),
    description: templateContent.fragmentToText({fragment: 'jobdescription.description'}),
    colourPrimary: templateContent.fragmentToText({fragment: 'jobdescription.colourprimary'}),
    colourText: templateContent.fragmentToText({fragment: 'jobdescription.colourtext'}),
    colourTextHighlight: templateContent.fragmentToText({fragment: 'jobdescription.colourtexthighlight'}),
    colourButtonText: templateContent.fragmentToText({fragment: 'jobdescription.colourbuttontext'})
  }

  setStyles(template.colourPrimary, template.colourText, template.colourTextHighlight, template.colourButtonText)
  const style = getStyle()

  const applyForJobButton = application ? (<button className={style.applied} disabled>We'll be in touch soon</button>) : (<button className={style.apply}>Find out more</button>)

  const uniqueLink = `/jobs/${get(props, 'company.slug', '')}+${get(props, 'job.slug', '')}${referral ? `+${referral.id}` : ''}`

  const data = {
    job: get(props, 'job'),
    company: get(props, 'company')
  }

  // Double check if we need to modify the article for the job title in template.title
  const jobTitleArticle = determineArticle(data.job.title)
  template.title = template.title.replace(/an?\s\{\{job.title\}\}/g, `${jobTitleArticle} {{job.title}}`)

  const title = render({
    template: template.title,
    data: data,
    tagify: (contents, ok, index, chunk) => {
      if (chunk === 'company.name' && data && data.company.url) {
        return <a className={style.jobHeaderTitleHighlightLink} key={`chunk${index}`} href={data.company.url} target='_blank'>{contents}</a>
      } else if (chunk === 'job.title' && data && data.job.url) {
        return <a className={style.jobHeaderTitleHighlightLink} key={`chunk${index}`} href={data.job.url} target='_blank'>{contents}</a>
      }

      return <span className={style.jobHeaderTitleHighlight} key={`chunk${index}`}>{contents}</span>
    }
  })

  const description = render({
    template: template.description,
    data: data
  })

  let bannerMessage = get(props, 'message')
  const isReferrerByProps = get(props, 'referrer.email') && get(props, 'person.email') && get(props, 'referrer.email') === get(props, 'person.email')
  const isReferrerByMessage = bannerMessage && bannerMessage.type === 'error' && bannerMessage.code === 403 && bannerMessage.message === 'Already referred'

  if (application) {
    bannerMessage = 'You\'ve already applied for this job'
  } else if (isReferrerByProps || isReferrerByMessage) {
    const successProps = merge({
      backgroundColour: template.colourPrimary,
      textColour: template.colourText,
      textHighlightColour: template.colourTextHighlight,
      buttonTextColour: template.colourButtonText
    }, props)
    bannerMessage = (<NudjSuccess {...successProps} />)
  }

  return (
    <div className={style.body}>
      <Message
        message={bannerMessage}
        messageType='jobs'
        backgroundColour={template.colourPrimary}
        textColour={template.colourText}
        textHighlightColour={template.colourTextHighlight}
        buttonTextColour={template.colourButtonText} />
      <Header
        backgroundColour={template.colourPrimary}
        textColour={template.colourText}
        textHighlightColour={template.colourTextHighlight}
        buttonTextColour={template.colourButtonText} />
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
          <h3 className={style.jobHeaderSubtitle}>What else you need to know…</h3>
          <p className={style.jobHeaderDescription}>{description}</p>
        </div>
        <section className={style.actions}>
          <form className={style.action} action={`${uniqueLink}/apply`} method='POST' onSubmit={onFormSubmit('new-application', props)}>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            {applyForJobButton}
            <p className={style.actionCopy}>Sign up &amp; we'll send you some info!</p>
          </form>
          <form className={style.action} action={`${uniqueLink}/nudj`} method='POST' onSubmit={onFormSubmit('new-referral', props)}>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            <button className={style.nudj}>Send to a friend</button>
            <p className={style.actionCopy}>We’ll give you <strong className={style.strong}>£{get(props, 'job.bonus')}</strong> if they get the job.</p>
          </form>
        </section>
      </div>
      <section className={style.related}>
        <h2 className={style.relatedTitle}>Other positions</h2>
        <ul className={style.list}>
          {get(props, 'job.related', []).map((related) => <li className={style.relatedJob} key={related.title.split(' ').join('-')}>
            <a className={style.blockLink} href={`/jobs/${related.companySlug}+${related.slug}`}>
              <p className={style.jobTitle}>{related.title} @ <span className={style.relatedCompany}>{related.companyName}</span></p>
              <span className={style.bodyLinks}>View job ></span>
            </a>
          </li>)}
        </ul>
      </section>
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
