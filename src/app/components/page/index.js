console.log(50)
const React = require('react')
console.log(51)

const getStyle = require('./style.css')
console.log(52)
const ScrollTop = require('../scroll-top')
console.log(53)
const Notification = require('../notification')
console.log(54)
const Footer = require('../footer')
console.log(55)
const CookieBanner = require('../cookie-banner')
console.log(56)

const Page = (props) => {
  console.log(57)
  const style = getStyle()
  console.log(58)

  return (
    <ScrollTop ignore={props.history.action === 'REPLACE'}>
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
console.log(59)

module.exports = Page

console.log(510)
