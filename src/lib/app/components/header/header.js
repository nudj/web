import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './header.css'

const Component = (props) => {
  return (
    <nav className={style.nav}>
      <div className={style.left}>
        <Link className={style.home} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo-light.svg' />
        </Link>
      </div>
      <div className={style.right}>
        <span className={style.toggle}>
          <span />
          <span />
          <span />
        </span>
        <a href='http://help.nudj.co' className={style.link}>Learn more</a>
        <Link to='/' className={style.link} >Companies</Link>
        <Link to='/hiring' className={style.link}>About</Link>
        <Link to='' id='open-intercom' className={style.request}>Sign up</Link>
      </div>
    </nav>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
