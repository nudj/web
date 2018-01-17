const React = require('react')
const { Link } = require('react-router-dom')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const Header = require('../../components/header')
const AnimateAppearance = require('../../components/animate-appearance')

const About = (props) => {
  const style = getStyle()
  return (
    <Page {...props} className={style.body}>
      <Header
        backgroundColour='midRed'
        textColour='white'
        textHighlightColour='royalBlue'
        location='/companies' />
      <section className={style.hero}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h1 className={style.heroTitle}>Join the nudj family. We love talented people.</h1>
          </AnimateAppearance>
        </div>
      </section>
      <section className={style.jobsSection}>
        <div className={style.header}>
          <AnimateAppearance from='bottom'>
            <h2 className={style.bodyTitle}>Jobs at nudj</h2>
          </AnimateAppearance>
        </div>
        <AnimateAppearance from='bottom'>
          <ul className={style.jobs}>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
            <li className={style.job}>
              <p className={style.jobTitle}>Front-End Lead Engineer @ <span className={style.red}>nudj</span></p>
              <Link to='' className={style.jobLink}>View job ></Link>
            </li>
          </ul>
        </AnimateAppearance>
      </section>
    </Page>
  )
}

module.exports = About
