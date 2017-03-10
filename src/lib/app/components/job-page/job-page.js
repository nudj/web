import React from 'react'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'

import style from './job-page.css'

function get (object, path, fallback) {
  return _get(object, path, fallback !== undefined ? fallback : <span style={{ color: 'red' }}>UNDEFINED</span>)
}

export default (props) => (
  <div className={style.container}>
    <div className={style.job}>
      <img className={style.logo} src='' />
      <h1 className={style.title}>{get(props, 'job.title')}</h1>
      <h2 className={style.location}>{get(props, 'job.location')}</h2>
      <h2 className={style.salary}>£{get(props, 'job.remuneration') * 1000}</h2>
      <ul className={style.links}>
        <li className={style.link}>
          <a href={get(props, 'job.company.url')}>View company website</a>
        </li>
        <li className={style.link}>
          <a href={get(props, 'job.url')}>View full job post</a>
        </li>
        <li className={style.social}>
          <a className={style.socialLink} href='#'>
            <i className={style.facebook} />
          </a>
        </li>
        <li className={style.social}>
          <a className={style.socialLink} href='#'>
            <i className={style.twitter} />
          </a>
        </li>
        <li className={style.social}>
          <a className={style.socialLink} href='#'>
            <i className={style.linkedin} />
          </a>
        </li>
        <li className={style.social}>
          <a className={style.socialLink} href='#'>
            <i className={style.instagram} />
          </a>
        </li>
      </ul>
      <div className={style.actions}>
        <div className={style.action}>
          <p>Interested? It only takes 2 seconds to apply & you don’t need a CV.</p><a className={style.apply} href='#'>Apply</a>
        </div>
        <div className={style.action}>
          <p>Know someone perfect? We’ll give you £{get(props, 'job.bonus')} if they get the job.</p><a className={style.nudj} href='#'>Nudj</a>
        </div>
      </div>
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
)
