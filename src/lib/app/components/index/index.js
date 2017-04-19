import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import style from './index.css'
import Header from '../header'
import Message from '../message'
import HomePage from '../home-page'
import RequestPage from '../request-page'
import SignupPage from '../signup-page'
import HirerPage from '../hirer-page'
import JobPage from '../job-page'
import ApplyPage from '../apply-page'
import NudjPage from '../nudj-page'
import ErrorPage from '../error-page'
import PageNotFound from '../404-page'
import Footer from '../footer'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

class Index extends Component {
  render () {
    let { page: data } = this.props
    return (
      <div className={style.body}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Nudj - Stop looking. Start hiring.</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='With your help, nudj connects the best companies with the best people, without any of the faff.' />
          <meta name='title' content='nudj - Stop looking. Start hiring.' />
          <meta property='og:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
          <meta property='twitter:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
          <meta property='og:type' content='article' />
          <meta property='og:title' content='nudj - Stop looking. Start hiring.' />
          <meta property='twitter:card' content='nudj - Stop looking. Start hiring.' />
          <meta property='twitter:title' content='nudj - Stop looking. Start hiring.' />
          <meta property='og:site_name' content='nudj - Stop looking. Start hiring.' />
          <meta property='twitter:image' content='' />
          <meta property='og:image' content='' />
          <link rel='icon' href='/assets/images/nudj-square.ico' type='image/x-icon' />
          <link rel='stylesheet' href='/assets/css/app.css' />
        </Helmet>
        <header className={style.header}>
          <Header {...data} />
        </header>
        {data.message ? <Message key='message' message={data.message} /> : ''}
        <div className={style.content}>
          {data.error && data.error.code ? <ErrorPage {...data.error} /> : (
            <Switch>
              <Route exact path='/' render={(props) => <HomePage {...props} {...data} />} />
              <Route exact path='/hiring' render={(props) => <HirerPage {...props} {...data} />} />
              <Route exact path='/request' render={(props) => <RequestPage {...props} {...data} />} />
              <Route exact path='/signup' render={(props) => <SignupPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId' render={(props) => <JobPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId/apply' render={(props) => <ApplyPage {...props} {...data} />} />
              <Route exact path='/:companySlug/:jobSlugId/nudj' render={(props) => <NudjPage {...props} {...data} />} />
              <Route render={(props) => (
                <Status code={404}>
                  <PageNotFound {...props} {...data} />
                </Status>
              )} />
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
