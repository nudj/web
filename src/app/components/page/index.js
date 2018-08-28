const React = require('react')

const getStyle = require('./style.css')
const ScrollTop = require('../scroll-top')
const Notification = require('../notification')
const Footer = require('../footer')
const CookieBanner = require('../cookie-banner')

const Page = (props) => {
  const style = getStyle()

  return (
    <ScrollTop ignore={process.env.USE_DEV_SERVER || props.history.action === 'REPLACE'}>
      <div className={`${props.className} ${style.body}`}>
        <Notification notification={props.notification} dispatch={props.dispatch} />
        {props.children}
        <CookieBanner />
        <footer className={style.footer}>
          <Footer />
        </footer>
      </div>
    </ScrollTop>
  )
}

module.exports = Page
