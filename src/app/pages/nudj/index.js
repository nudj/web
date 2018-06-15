const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const NudjSuccess = require('../../components/nudj-success')
const Header = require('../../components/header')
const Message = require('../../components/message')

const Nudj = (props) => {
  const company = get(props, 'company', {})
  const job = get(company, 'job', {})
  const pageTitle = `Congratulations, you've nudj'ed a job!`
  const socialTitle = `I'm trying to find a ${job.title} for ${company.name}. Can you help?`
  const pageDescription = `There is a bonus of ${job.bonus} up for grabs if anyone you refer gets the job.`

  const style = getStyle()
  return (<Page {...props} className={style.pageContainer}>
    <Message message={get(props, 'message')} />
    <Helmet>
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <meta name='title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={socialTitle} />
      <meta property='og:site_name' content='nudj' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={socialTitle} />
      <meta name='twitter:description' content={pageDescription} />
    </Helmet>
    <Header />
    <div className={style.page}>
      <div className={style.box}>
        <h1 className={style.heading}>We&apos;ve created a unique link for you. Now share it!</h1>
        <p className={style.subtitle}>This link will ensure that you get rewarded should anyone you refer get the job. Not sure how to share it? Check out our handy guide <a href='http://help.nudj.co/the-nudj-platform/for-people-looking-for-jobs-and-referring-friends/how-can-i-share-my-referral-link' className={style.link}>here</a>.</p>
        <div className={style.success}>
          <NudjSuccess {...props} />
        </div>
        <div className={style.tip}>
          <h2 className={style.tipTitle}>Here&apos;s a little tip</h2>
          <p className={style.tipBody}>Don&apos;t over think it. Just send it straight to any of your friends that you think might be interested - they&apos;ll appreciate you thinking of them.</p>
        </div>
      </div>
    </div>
  </Page>)
}

module.exports = Nudj
