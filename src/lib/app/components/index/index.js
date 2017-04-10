import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import style from './index.css'
import Header from '../header'
import Message from '../message'
import HomePage from '../home-page'
import RequestPage from '../request-page'
import HirerPage from '../hirer-page'
import JobPage from '../job-page'
import ApplyPage from '../apply-page'
import NudjPage from '../nudj-page'
import ErrorPage from '../error-page'
import PageNotFound from '../404-page'
import Footer from '../footer'

class Index extends Component {
  render () {
    let { page: data } = this.props
    return (
      <div className={style.body}>
        <header className={style.header}>
          <Header {...data} />
        </header>
        {data.message ? <Message key='message' message={data.message} /> : ''}
        <div className={style.content}>
          {data.error && data.error.code ? <ErrorPage {...data.error} /> : (
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} {...data} />} />
              <Route exact path='/companies' render={(props) => <HirerPage {...props} {...data} />} />
              <Route exact path='/request' render={(props) => <RequestPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId' render={(props) => <JobPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId/apply' render={(props) => <ApplyPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId/nudj' render={(props) => <NudjPage {...props} {...data} />} />
              <Route render={(props) => <PageNotFound {...props} {...data} />} />
            </Switch>
          )}
        </div>
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
