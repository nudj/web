const React = require('react')
const getStyle = require('./job-card.css')
const { Link } = require('react-router-dom')

const JobCard = props => {
  const {
    company,
    title,
    salary,
    location,
    jobHref,
    companyHref
  } = props

  const style = getStyle()

  return (
    <div className={style.jobCard}>
      <div className={style.jobCardLeft}>
        <h2 className={style.jobTitle}>{title}</h2>
        { company && (
        <Link className={style.companyTitle} to={companyHref}>{company}</Link>
        )}
        <ul className={style.jobMetaList}>
          <li className={style.jobMetaItem}>
            <p className={style.metaTitle}>Salary</p>
            <p className={style.metaData}>{salary}</p>
          </li>
          <li className={style.jobMetaItem}>
            <p className={style.metaTitle}>Location</p>
            <p className={style.metaData}>{location}</p>
          </li>
        </ul>
      </div>
      <div className={style.jobCardRight}>
        <Link className={style.jobLink} to={jobHref}>View job ></Link>
      </div>
    </div>
  )
}

module.exports = JobCard
