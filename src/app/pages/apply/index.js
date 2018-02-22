const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const RandomHover = require('../../components/random-hover')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

const Apply = (props) => {
  const style = getStyle()

  return (<Page {...props} className={style.bodyContainer}>
    <Helmet>
      <title>You&apos;ve applied - nudj</title>
      <meta name='description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
      <meta name='title' content='You&apos;ve applied for a job! - nudj' />
      <meta property='og:description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
      <meta property='twitter:description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='You&apos;ve applied for a job on nudj!' />
      <meta property='twitter:card' content='You&apos;ve applied for a job on nudj!' />
      <meta property='twitter:title' content='You&apos;ve applied for a job on nudj!' />
      <meta property='og:site_name' content='nudj' />
    </Helmet>
    <Message message={get(props, 'message')} />
    <Header />
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.formHeaderSuccess}>
          <h1 className={style.title}>Nice one, you've applied!</h1>
          <p className={style.subtitle}>We're now taking a quick look at your profile to check that it matches what the company is looking for (read more about why we do this <a href='http://help.nudj.co/the-nudj-platform/for-people-looking-for-jobs-and-referring-friends/what-happens-after-i-apply' className={style.link}>here</a>).</p>
          <p className={style.subtitle}>In the meantime if you have a question our team are on hand to answer, so just hit the button below to speak to an actual human being!</p>
          <p className={style.subtitle}><RandomHover><a href='mailto:help@nudj.co' id='open-intercom' className={style.button}>Ask us a question</a></RandomHover></p>
          <img className={style.thumbsUp} src='/assets/images/thumbs-up.svg' alt='Thumbs up' />
        </div>
      </div>
    </div>
  </Page>)
}

module.exports = Apply
