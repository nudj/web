import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import style from './index.css'
import Header from '../header'
import Message from '../message'
import HomePage from '../home-page'
import RequestPage from '../request-page'
import SuccessPage from '../success-page'
import HirerPage from '../hirer-page'
import JobPage from '../job-page'
import ApplyPage from '../apply-page'
import NudjPage from '../nudj-page'
import ErrorPage from '../error-page'
import PageNotFound from '../404-page'
import ServerError from '../500-page'
import Footer from '../footer'

class Index extends Component {
  render () {
    return this.props.error ? <ErrorPage error={this.props.error} /> : (
      <div className={style.body}>
        <header className={style.header}>
          <Header />
        </header>
        {this.props.message ? <Message key='message' message={this.props.message} /> : ''}
        <Route exact path='/' render={(props) => <HomePage {...props} {...this.props.page} />} />
        <Route exact path='/companies' render={(props) => <HirerPage {...props} {...this.props.page} />} />
        <Route exact path='/request' render={(props) => <RequestPage {...props} {...this.props.page} />} />
        <Route exact path='/success' render={(props) => <SuccessPage {...props} {...this.props.page} />} />
        <Route exact path='/:companySlug/:jobSlugId' render={(props) => <JobPage {...props} {...this.props.page} />} />
        <Route exact path='/:companySlug/:jobSlugId/apply' render={(props) => <ApplyPage {...props} {...this.props} />} />
        <Route exact path='/:companySlug/:jobSlugId/nudj' render={(props) => <NudjPage {...props} {...this.props} />} />
        <Route exact path='/404' render={(props) => <PageNotFound {...props} {...this.props.page} />} />
        <Route exact path='/500' render={(props) => <ServerError {...props} {...this.props.page} />} />
        <footer className={style.footer}>
          <Footer />
        </footer>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => state

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
