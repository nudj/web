import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
// import style from './index.css'
import Header from '../header'
import JobPage from '../job-page'

class Index extends Component {
  render () {
    return this.props.error ? <div>{this.props.error}</div> : (
      <div>
        <Header />
        <Route path='/:companySlug/:jobSlugId' render={(props) => <JobPage {...props} {...this.props.page} />} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => state

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
