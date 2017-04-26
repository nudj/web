import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import NudjSuccess from '../nudj-success'
import style from './job-page.css'

function renderLinkMessage (props) {
  let message
  if (
    get(props, 'referrer.email') &&
    get(props, 'person.email') &&
    get(props, 'referrer.email') === get(props, 'person.email')
  ) {
    message = <NudjSuccess {...props} />
  }
  return message
}

const Component = (props) => {
  const referral = get(props, 'referral')
  const title = `${get(props, 'company.name')} - ${get(props, 'job.title')}`
  const image = get(props, 'company.logo')
  return (
    <div className={style.body}>
      <Helmet>
        <title>{title}</title>
        <meta name='title' content={title} />
        <meta property='og:title' content={title} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:image' content={image} />
        <meta property='og:image' content={image} />
      </Helmet>
      <div className={style.job}>
        {renderLinkMessage(props)}
        <h1 className={style.title}>{get(props, 'job.title')} <br className={style.break} />@ <a href={get(props, 'company.url', '#company-url')} className={style.brandName}>{get(props, 'company.name')}</a></h1>
        <section className={style.info}>
          <div className={style.infoContainer}>
            <p className={style.infoTitle}>Location</p>
            <h2 className={style.infoBody}>{get(props, 'job.location')}</h2>
          </div>
          <div className={style.infoContainer}>
            <p className={style.infoTitle}>Salary</p>
            <h2 className={style.infoBody}>{get(props, 'job.remuneration')}</h2>
          </div>
        </section>
        <hr className={style.breakLine} />
        <section className={style.description}>
          <div className={style.why}>
            <h3 className={style.awesomeTitle}>Why is this job so hot right now?</h3>
            <p className={style.awesomeCopy}>{get(props, 'company.description')}</p>
            <a href={get(props, 'company.url', '#company-url')} className={style.bodyLinks}>View company website ></a>
          </div>
          <div className={style.why}>
            <h3 className={style.awesomeTitle}>What skills do you need?</h3>
            <p className={style.awesomeCopy}>{get(props, 'job.description')}</p>
            <a href={get(props, 'job.url', '#job-url')} className={style.bodyLinks}>View full job post ></a>
          </div>
        </section>
        <hr className={style.breakLine} />
        <section className={style.actions}>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/apply`} method='POST'>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            <h2 className={style.actionTitle}>Interested?</h2>
            <p className={style.actionCopy}>It only takes <strong>a few seconds to apply</strong> &amp; you don’t even need a CV! Just enter a few details and we'll take care of the rest.</p>
            <button className={style.apply}>Apply for job</button>
          </form>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/nudj`} method='POST'>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            <h2 className={style.actionTitle}>Know someone perfect?</h2>
            <p className={style.actionCopy}>We’ll <strong>give you £{get(props, 'job.bonus')} if they get the job.</strong> Simply sign up &amp; we'll give you a unique link to this page, which you can share.</p>
            <button className={style.nudj}>Send to a friend</button>
          </form>
        </section>
      </div>
      <section className={style.related}>
        <h2 className={style.title}>Other positions</h2>
        <ul className={style.list}>
          {get(props, 'job.related', []).map((related) => <li className={style.relatedJob} key={related.title.split(' ').join('-')}>
            <p className={style.jobTitle}>{related.title} @ <span className={style.red}>{related.companyName}</span></p>
            <Link className={style.bodyLinks} to={related.url}>View job ></Link>
          </li>)}
        </ul>
      </section>
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
