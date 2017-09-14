const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')
const Page = require('../../components/page')
const NudjSuccess = require('../../components/nudj-success')
const Header = require('../../components/header')
const Message = require('../../components/message')

const Nudj = (props) => {
  const style = getStyle()
  return (<Page {...props} className={style.pageContainer}>
    <Message message={get(props, 'message')} />
    <Header />
    <div className={style.page}>
      <div className={style.box}>
        <h1 className={style.heading}>Awesomesauce! Here's your special link to share with your friends</h1>
        <div className={style.success}>
          <NudjSuccess {...props} />
        </div>
        <div className={style.tip}>
          <h2 className={style.tipTitle}>Here's a little tip...</h2>
          <p className={style.tipBody}>Don't over think it. Just send it straight to any of your friends that you think might be interested - they'll appreciate you thinking of them.</p>
        </div>
      </div>
    </div>
  </Page>)
}

module.exports = Nudj
