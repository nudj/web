import React from 'react'
import { Route } from 'react-router-dom'
import style from './index.css'
import Header from '../header'
import JobPage from '../job-page'

export default ({
  page
}) => (
  <div className={style.app}>
    <Header />
    <Route path="/jobs/:jid" render={() => (<JobPage {...page} />)} />
  </div>
)
