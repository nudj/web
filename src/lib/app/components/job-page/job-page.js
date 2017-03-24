import React from 'react'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'

import style from './job-page.css'

function get (object, path, fallback) {
  return _get(object, path, fallback !== undefined ? fallback : <span style={{ color: 'red' }}>UNDEFINED</span>)
}

export default (props) => (
  <div className={style.section}>
    <div className={style.container}>
      <div className={style.job}>
        <img className={style.logo} src={get(props, 'company.logo')} />
       <h1 className={style.title}>{get(props, 'job.title')}</h1>
       <h2 className={style.location}>{get(props, 'job.location')}</h2>
       <h2 className={style.salary}>£{get(props, 'job.remuneration') * 1000}</h2>
       <hr className={style.breakLine} />
       <div className={style.links}>
        <div className={style.link}>
          <a href={get(props, 'company.url', '#company-url')}>View company website</a>
        </div>
        <div className={style.link}>
          <a href={get(props, 'job.url', '#job-url')}>View full job post</a>
        </div>
        <div className={style.social}>
          <div className={style.socialLink}>
            <a href='#'>
              <i className={style.facebook} />
            </a>
          </div>
          <div className={style.socialLink}>
            <a href='#'>
              <i className={style.twitter} />
            </a>
          </div>
          <div className={style.socialLink}>
            <a href='#'>
              <i className={style.linkedin} />
            </a>
          </div>
          <div className={style.socialLink}>
            <a href='#'>
              <i className={style.instagram} />
            </a>
          </div>
        </div>
      </div>
        <hr className={style.breakLine} />
        <div className={style.actions}>
        <div className={style.action}>
          <p>Interested? It only takes <strong>2 seconds</strong> to apply & you don’t need a CV.</p><a className={style.apply} href='#'>Apply</a>
        </div>
        <div className={style.action}>
          <p>Know someone perfect? We’ll give you <strong>£{get(props, 'job.bonus')}</strong> if they get the job.</p><a className={style.nudj} href='#'>Nudj</a>
        </div>
      </div>
        <hr className={style.breakLine} />
        <div className={style.related}>
        <h2 className={style.relatedTitle}>Other positions</h2>
        <Link to={`/`}>Home</Link>
        <ul>
          {get(props, 'job.related', []).map((related) => <li key={related.title.split(' ').join('-')}>
            <Link to={`/jobs/${related.id}`}>{related.title}, {related.location}</Link>
          </li>)}
        </ul>
      </div>
      </div>
    </div>
  </div>
)
