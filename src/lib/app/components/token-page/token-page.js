import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import Header from '../header'
import { getStyle } from './token-page.css'

function makeLink (companySlug, jobSlug, referralId) {
  return `https://nudj.co/jobs/${companySlug}+${jobSlug}+${referralId}`
}

const Component = (props) => {
  const style = getStyle()
  const company = get(props, 'employee.company')
  const companySlug = get(company, 'slug')
  const jobs = get(props, 'jobs')

  // const tokenType = get(props, 'token.type')

  const jobsList = jobs.map((job, index) => {
    const jobSlug = get(job, 'slug')
    const referralId = get(job, 'referral.id')
    return (<li className={style.jobsListItem} key={index}>{makeLink(companySlug, jobSlug, referralId)}</li>)
  })

  return (
    <div className={style.body}>
      <Header />
      <div className={style.token}>
        <div className={style.tokenHeader}>
          <h1 className={style.tokenHeaderTitle}>Ready to share your company's jobs?</h1>
          <p className={style.tokenHeaderDescription}>A description of what this screen is for - thanking them for completing the survey and then getting them to share.</p>
        </div>
        <ul className={style.jobsList}>
          {jobsList}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
