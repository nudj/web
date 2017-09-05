import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import Header from '../header'
import NudjSuccess from '../nudj-success'
import { getStyle } from './token-page.css'

class TokenPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const tokenType = get(this.props, 'token.type', '')
    this.state = {tokenType}
  }

  makeLink (companySlug, jobSlug, referralId) {
    return `https://nudj.co/jobs/${companySlug}+${jobSlug}+${referralId}`
  }

  renderTypeformResults (typeformResults) {
    const results = typeformResults.map((question, index) => {
      const cellClass = index % 2 ? this.style.tableCellEvenRow : this.style.tableCell
      return (<tr className={this.style.tableRow} key={question.id}>
        <td className={`${cellClass} ${this.style.tableCellFirst}`}>{index + 1}</td>
        <td className={cellClass}>{question.question}</td>
        <td className={cellClass}>{question.answer}</td>
      </tr>)
    })

    return (<table className={this.style.table}>
      <thead>
        <tr className={this.style.tableHeaderRow}>
          <th className={this.style.tableHeaderFirst} />
          <th className={this.style.tableHeader}>Question</th>
          <th className={this.style.tableHeader}>Your answer</th>
        </tr>
      </thead>
      <tbody className={this.style.tableBody}>
        {results}
      </tbody>
    </table>)
  }

  render () {
    const company = get(this.props, 'employee.company')
    const companySlug = get(company, 'slug')
    const jobs = get(this.props, 'jobs')

    const jobsList = jobs.map((job, index) => {
      const jobSlug = get(job, 'slug')
      const referralId = get(job, 'referral.id')
      const jobTitle = get(job, 'title')
      const link = this.makeLink(companySlug, jobSlug, referralId)

      const referral = get(job, 'referral')
      const url = get(this.props, 'url')
      const mobileOnly = true
      const copyProps = {referral, url, mobileOnly}

      return (
        <li className={this.style.jobsListItem} key={index}>
          <h4 className={this.style.jobsListItemTitle}>{jobTitle}</h4>
          <NudjSuccess {...copyProps} />
          <div className={this.style.linkContainer}>{link}</div>
          <div className={this.style.buttonContainer}>
            <button className={this.style.shareLinkButton} data-clipboard-text={link}>Copy</button>
          </div>
        </li>
      )
    })

    const typeformResults = get(this.props, 'typeformResults')

    return (
      <div className={this.style.body}>
        <Header />
        <div className={this.style.token}>
          <div className={this.style.tokenHeader}>
            <div className={this.style.tokenHeaderContent}>
              <h1 className={this.style.tokenHeaderTitle}>Ready to share your company's jobs?</h1>
              <p className={this.style.tokenHeaderDescription}>Thanks for completing the survey! Now share your company's jobs with the people you recommended.</p>
            </div>
          </div>
          <ul className={this.style.jobsList}>
            {jobsList}
          </ul>
          <div className={this.style.tokenContent}>
            <h3 className={this.style.tokenTitle}>Can't remember who you recommended?</h3>
            <p className={this.style.tokenCopy}>View your survey results to jog your memory.</p>
            {this.renderTypeformResults(typeformResults)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenPage))
