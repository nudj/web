const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const Message = require('../../components/message')

const Apply = (props) => {
  const style = getStyle()

  return (<Page {...props} className={style.bodyContainer}>
    <Message message={get(props, 'message')} />
    <Header />
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.formHeaderSuccess}>
          <h1 className={style.title}>We'll be in touch!</h1>
          <p className={style.subtitle}>Someone from our team will contact you shortly. In the meantime, sit back, relax and give yourself a pat on the back.</p>
          <p className={style.subtitle}>If you'd like to hear about other awesome jobs on our platform then <a href='mailto:hello@nudj.co' className={style.link} id='open-intercom'>get in touch</a>.</p>
          <img className={style.thumbsUp} src='/assets/images/thumbs-up.svg' alt='Thumbs up' />
        </div>
      </div>
    </div>
  </Page>)
}

module.exports = Apply
