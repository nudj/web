import React from 'react'
import style from './index.css'
import Header from '../header'
import JobPage from '../job-page'

export default ({
  page
}) => (
  <div className={style.app}>
    <Header />
    <JobPage {...page} />
  </div>
)
