import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import NudjSuccess from '../nudj-success'
import style from './job-page.css'

function renderLinkMessage (props) {
  let message
  if (
    get(props, 'referrer.email') &&
    get(props, 'user._json.email') &&
    get(props, 'referrer.email') === get(props, 'user._json.email')
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
          <img className={style.logo} src={get(props, 'company.logo')} />
          <h1 className={style.title}>{get(props, 'job.title')} @ <span>{get(props, 'company.name')}</span></h1>
          <h2 className={style.location}>Based in: {get(props, 'job.location')}</h2>
          <h2 className={style.salary}>Salary: £{get(props, 'job.remuneration') * 1000}</h2>
        </div>
        <hr className={style.breakLine} />
        <div className={style.description}>
          <div className={style.why}>
            <p className={style.awesomeTitle}>Why is this job is so hot right now?</p>
            <p className={style.awesome}>{get(props, 'company.description')}</p>
          </div>
          <div className={style.why}>
            <p className={style.awesomeTitle}>What skills do you need?</p>
            <p className={style.awesome}>{get(props, 'job.description')}</p>
          </div>
        </div>
        <hr className={style.breakLine} />
        <div className={style.companyLinks}>
          <div className={style.links}>
            <div className={style.link}>
              <Link to={get(props, 'company.url', '#company-url')} className={style.bodyLinks}>View company website</Link>
            </div>
            <div className={style.link}>
              <Link to={get(props, 'job.url', '#job-url')} className={style.bodyLinks}>View full job post</Link>
            </div>
          </div>
          <div className={style.social}>
            <div className={style.socialLink}>
              <Link to={get(props, 'company.facebook', '#facebook-url')}>
                <i className={style.facebook} />
              </Link>
            </div>
            <div className={style.socialLink}>
              <Link to={get(props, 'company.twitter', '#twitter-url')}>
                <i className={style.twitter} />
              </Link>
            </div>
            <div className={style.socialLink}>
              <Link to={get(props, 'company.linkedin', '#linkedin-url')}>
                <i className={style.linkedin} />
              </Link>
            </div>
          </div>
        </div>
        <hr className={style.breakLine} />
        <div className={style.actions}>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/apply`} method='POST'>
            <p className={style.actionCopy}>Interested? It only takes <strong>a few seconds</strong> to apply & you don’t need a CV.</p><button className={style.apply}>Apply for job</button>
          </form>
          <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}${referral ? `+${referral.id}` : ''}/nudj`} method='POST'>
            <p className={style.actionCopy}>Know someone perfect? <strong>We’ll give you £{get(props, 'job.bonus')}</strong> if they get the job.</p><button className={style.nudj}>Send to a friend</button>
          </form>
        </div>
        <hr className={style.breakLine} />
        <div className={style.related}>
          <h2 className={style.title}>Other positions</h2>
          <Link className={style.bodyLinks} to={`/`}>Home</Link>
          <ul>
            {get(props, 'job.related', []).map((related) => <li key={related.title.split(' ').join('-')}>
              <Link to={`/jobs/${related.id}`}>{related.title}, {related.location}</Link>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
