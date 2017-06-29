import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import getStyle from './apply-page.css'
import get from 'lodash/get'

import Header from '../header'
import Message from '../message'

const Component = (props) => {
  const style = getStyle()

  return (<div className={style.bodyContainer}>
    <Message message={get(props, 'message')} />
    <Header />
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.formHeaderSuccess}>
          <h1 className={style.title}>We'll be in touch!</h1>
          <p className={style.subtitle}>Someone from our team will contact you shortly. In the meantime, sit back, relax and give yourself a pat on the back.</p>
          <p className={style.subtitle}>If you'd like to hear about other awesome jobs on our platform then <a href='' className={style.link} id='open-intercom'>get in touch</a>.</p>
          <img className={style.thumbsUp} src='/assets/images/thumbs-up.svg' alt='Thumbs up' />
        </div>
      </div>
    </div>
  </div>)
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
