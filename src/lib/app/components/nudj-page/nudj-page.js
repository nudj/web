import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NudjSuccess from '../nudj-success'

import getStyle from './nudj-page.css'

const Component = (props) => {
  const style = getStyle()
  return (
    <div className={style.page}>
      <div className={style.box}>
        <h1 className={style.heading}>Awesomesauce! Here's your special link to share with your friends</h1>
        <NudjSuccess {...props} />
        <div className={style.tip}>
          <h2 className={style.tipTitle}>Here's a little tip...</h2>
          <p className={style.tipBody}>Don't over think it. Just send it straight to any of your friends that you think might be interested - they'll appreciate you thinking of them.</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
