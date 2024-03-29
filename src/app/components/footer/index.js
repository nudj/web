const React = require('react')
const getYear = require('date-fns/get_year')

const getStyle = require('./footer.css')

const Footer = (props) => {
  const style = getStyle()
  return (<div className={style.background}>
    <div className={style.container}>
      <ul className={style.links}>
        <li className={style.link}>
          <a className={style.blog} href='http://blog.nudj.co' target='_blank'>Blog</a>
          <p className={style.label}>Musings, observations and ideas from the team.</p>
        </li>
        <li className={style.link}>
          <a className={style.help} href='http://help.nudj.co/' target='_blank'>Help Centre</a>
          <p className={style.label}>Learn how to hire &amp; get hired with nudj.</p>
        </li>
        <li className={style.link}>
          <a className={style.release} href='//headwayapp.co/nudj-updates' target='_blank'>Release Notes</a>
          <p className={style.label}>Discover what new things we've built recently.</p>
        </li>
        <li className={style.link}>
          <a className={style.roadmap} href='//nudj.canny.io/product-roadmap' target='_blank'>Product Roadmap</a>
          <p className={style.label}>Help us decide how to make nudj even better.</p>
        </li>
        <li className={style.link}>
          <a className={style.terms} href='http://help.nudj.co/pricing-privacy-and-terms' target='_blank'>Terms &amp; Privacy</a>
          <p className={style.label}>The legal stuff, including cookie policy.</p>
        </li>
      </ul>
      <div className={style.icon}>
        <img className={style.logo} src='/assets/images/nudj-logo-light.svg' />
      </div>
    </div>
    <span className={style.copyright}>&#169; <span>{getYear(new Date())}</span> <strong>nudj</strong>, All Rights Reserved</span>
  </div>)
}

module.exports = Footer
