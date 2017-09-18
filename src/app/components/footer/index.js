const React = require('react')
const { Link } = require('react-router-dom')

const getStyle = require('./footer.css')

const Footer = (props) => {
  const style = getStyle()
  return (<div className={style.background}>
    <div className={style.container}>
      <ul className={style.links}>
        <li className={style.link}>
          <a className={style.help} href='http://help.nudj.co/' target='_blank'>Help Centre</a>
          <p className={style.label}>Learn how to how to hire and get hired with nudj.</p>
        </li>
        <li className={style.link}>
          <a className={style.blog} href='http://blog.nudj.co' target='_blank'>Blog</a>
          <p className={style.label}>Musings, observations and ideas from the makers of nudj.</p>
        </li>
        <li className={style.link}>
          <a className={style.release} href='//headwayapp.co/nudj-updates' target='_blank'>Release Notes</a>
          <p className={style.label}>Discover what we've just shipped.</p>
        </li>
        <li className={style.link}>
          <a className={style.roadmap} href='//nudj.canny.io/product-roadmap' target='_blank'>Product Roadmap</a>
          <p className={style.label}>Help us decide what to build next.</p>
        </li>
        <li className={style.link}>
          <Link className={style.hiring} to='/jobs/nudj+full-stack-software-engineer'>We're Hiring!</Link>
          <p className={style.label}>Join our team &amp; build something awesome.</p>
        </li>
        <li className={style.link}>
          <a className={style.terms} href='http://help.nudj.co/privacy-and-terms' target='_blank'>Terms &amp; Privacy</a>
          <p className={style.label}>The legal stuff, including cookie policy.</p>
        </li>
      </ul>
      <div className={style.icon}>
        <img className={style.logo} src='/assets/images/nudj-logo-light.svg' />
      </div>
    </div>
    <span className={style.copyright}>&#169; 2017 <strong>nudj</strong>, All Rights Reserved</span>
  </div>)
}

module.exports = Footer
