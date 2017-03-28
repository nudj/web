import React from 'react'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import Header from '../header'
import style from './job-page.css'

function get (object, path, fallback) {
  return _get(object, path, fallback !== undefined ? fallback : <span style={{ color: 'red' }}>UNDEFINED</span>)
}

export default (props) => (
  <div className={style.body}>
    <div className={style.heroFull}>
      <div className={style.heroHead}>
        <div className={style.container}>
          <Header />
        </div>
      </div>
      <div className={style.heroBody}>
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
            <form className={style.action} action={`/${get(props, 'company.slug')}/${get(props, 'job.slug')}+${get(props, 'referral.id')}/nudj`} method='GET'>
              <p>Know someone perfect? We’ll give you £{get(props, 'job.bonus')} if they get the job.</p><button className={style.nudj}>Nudj</button>
            </form>
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
      <footer className={style.heroFoot}>
        <div className={style.centered}>
          <div className={style.footerCopy}>© 2017 <strong>nudj</strong>, All Rights Reserved</div>
          <a className={style.buttonLink} href='https://www.iubenda.com/privacy-policy/8051143' target='_blank'>Privacy</a>
        </div>
      </footer>
    </div>
  </div>
)
