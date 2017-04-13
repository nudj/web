import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
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

export default (props) => {
  let referral = get(props, 'referral')
  return (
    <div className={style.body}>
      <div className={style.job}>
        {renderLinkMessage(props)}
        <div className={style.info}>
          <h1 className={style.title}>{get(props, 'job.title')} @ <a href={get(props, 'company.url', '#company-url')} className={style.brandName}>{get(props, 'company.name')}</a></h1>
          <h2 className={style.location}>Based in: {get(props, 'job.location')}</h2>
          <h2 className={style.salary}>Salary: {get(props, 'job.remuneration')}</h2>
        </div>
        <hr className={style.breakLine} />
        <div className={style.description}>
          <div className={style.why}>
            <h3 className={style.awesomeTitle}>Why is this job so hot right now?</h3>
            <p className={style.awesome}>{get(props, 'company.description')}</p>
            <a href={get(props, 'company.url', '#company-url')} className={style.bodyLinks}>View company website</a>
          </div>
          <div className={style.why}>
            <h3 className={style.awesomeTitle}>What skills do you need?</h3>
            <p className={style.awesome}>{get(props, 'job.description')}</p>
            <a href={get(props, 'job.url', '#job-url')} className={style.bodyLinks}>View full job post</a>
          </div>
        </div>
        <hr className={style.breakLine} />
        <div className={style.actions}>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/apply`} method='POST'>
            <h2 className={style.actionTitle}>Interested?</h2>
            <p className={style.actionCopy}>It only takes <strong>a few seconds to apply</strong> &amp; you don’t even need a CV! Just enter a few details and we'll take care of the rest.</p><button className={style.apply}>Apply for job</button>
          </form>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/nudj`} method='POST'>
            <h2 className={style.actionTitle}>Know someone perfect?</h2>
            <p className={style.actionCopy}>We’ll <strong>give you £{get(props, 'job.bonus')} if they get the job.</strong> Simply sign up &amp; we'll give you a unique link to this page, which you can share.</p>
            <button className={style.nudj}>Send to a friend</button>
          </form>
        </div>
      </div>
      <div className={style.backgroundFooter}>
        <div className={style.related}>
          <h2 className={style.title}>Other positions @ {get(props, 'company.name')}</h2>
          <ul className={style.list}>
            {get(props, 'job.related', []).map((related) => <li key={related.title.split(' ').join('-')}>
              <Link className={style.bodyLinks} to={related.url}>{related.title}, {related.location}</Link>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
