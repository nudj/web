import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import style from './index.css'
import Header from '../header'
import Message from '../message'
import HomePage from '../home-page'
import JobPage from '../job-page'
import ErrorPage from '../error-page'

class Index extends Component {
  render () {
    return this.props.error ? <ErrorPage error={this.props.error} /> : (
      <div>
        <header className={style.header}>
          <Header />
        </header>
        {this.props.message ? <Message key='message' message={this.props.message} /> : ''}
        <Route exact path='/' render={(props) => <HomePage {...props} {...this.props} />} />
        <Route exact path='/:companySlug/:jobSlugId' render={(props) => <JobPage {...props} {...this.props} />} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => state

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
