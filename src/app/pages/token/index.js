const React = require('react')
const get = require('lodash/get')

const Page = require('../../components/page')
const Header = require('../../components/header')
const NudjSuccess = require('../../components/nudj-success')
const CopyToClipboard = require('../../components/copy-to-clipboard')
const { getStyle } = require('./style.css')

const makeLink = (hostname, companySlug, jobSlug, referralId) => {
  return `https://${hostname}/jobs/${companySlug}+${jobSlug}+${referralId}`
}

const renderTypeformResults = (typeformResults, style) => {
  const results = typeformResults.map((question, index) => {
    const cellClass = index % 2 ? style.tableCellEvenRow : style.tableCell
    return (<tr className={style.tableRow} key={question.id}>
      <td className={`${cellClass} ${style.tableCellFirst}`}>{index + 1}</td>
      <td className={cellClass}>{question.question}</td>
      <td className={cellClass}>{question.answer}</td>
    </tr>)
  })

  return (<table className={style.table}>
    <thead>
      <tr className={style.tableHeaderRow}>
        <th className={style.tableHeaderFirst} />
        <th className={style.tableHeader}>Question</th>
        <th className={style.tableHeader}>Your answer</th>
      </tr>
    </thead>
    <tbody className={style.tableBody}>
      {results}
    </tbody>
  </table>)
}

const TokenPage = (props) => {
  const style = getStyle()
  const company = get(props, 'employee.company')
  const companySlug = get(company, 'slug')
  const jobs = get(props, 'jobs')
  const hostname = get(props, 'url.hostname')
  const typeformResults = get(props, 'typeformResults')

  const jobsList = jobs.map((job, index) => {
    const jobSlug = get(job, 'slug')
    const referralId = get(job, 'referral.id')
    const jobTitle = get(job, 'title')
    const link = makeLink(hostname, companySlug, jobSlug, referralId)

    const referral = get(job, 'referral')
    const url = get(props, 'url')
    const mobileOnly = true
    const copyProps = {referral, url, mobileOnly}

    return (
      <li className={style.jobsListItem} key={index}>
        <h4 className={style.jobsListItemTitle}>{jobTitle}</h4>
        <NudjSuccess {...copyProps} />
        <div className={style.linkContainer}>{link}</div>
        <div className={style.buttonContainer}>
          <CopyToClipboard className={style.shareLinkButton} data-clipboard-text={link}>Copy</CopyToClipboard>
        </div>
      </li>
    )
  })

  return (
    <Page {...props} className={style.body}>
      <Header />
      <div className={style.token}>
        <div className={style.tokenHeader}>
          <div className={style.tokenHeaderContent}>
            <h1 className={style.tokenHeaderTitle}>Ready to share your company's jobs?</h1>
            <p className={style.tokenHeaderDescription}>Thanks for completing the survey! Now share your company's jobs with the people you recommended.</p>
          </div>
        </div>
        <ul className={style.jobsList}>
          {jobsList}
        </ul>
        <div className={style.tokenContent}>
          <h3 className={style.tokenTitle}>Can't remember who you recommended?</h3>
          <p className={style.tokenCopy}>View your survey results to jog your memory.</p>
          {renderTypeformResults(typeformResults, style)}
        </div>
      </div>
    </Page>
  )
}

module.exports = TokenPage
