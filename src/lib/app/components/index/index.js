import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import getStyle from './index.css'
import Page from '../page'
import Footer from '../footer'

const Index = () => {
  const style = getStyle()
  return (
    <div className={style.body}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Nudj - Stop looking. Start hiring.</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='With your help, nudj connects the best companies with the best people, without any of the faff.' />
        <meta name='title' content='nudj - A better job is just a nudj away.' />
        <meta property='og:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
        <meta property='twitter:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content='nudj - A better job is just a nudj away.' />
        <meta property='twitter:card' content='nudj - A better job is just a nudj away.' />
        <meta property='twitter:title' content='nudj - A better job is just a nudj away.' />
        <meta property='og:site_name' content='nudj - A better job is just a nudj away.' />
        <meta property='twitter:image' content='https://assets.nudj.co/assets/images/social/nudj-card-og.jpg' />
        <meta property='og:image' content='https://assets.nudj.co/assets/images/social/nudj-card-og.jpg' />
        <link rel='icon' href='/assets/images/nudj-square.ico' type='image/x-icon' />
        <link rel='stylesheet' href='/assets/css/normalize.css' />
        <link rel='stylesheet' href='/assets/css/reset.css' />
        <link rel='stylesheet' href='/assets/css/hamburgers.css' />
      </Helmet>
      <div className={style.content}>
        <Route path='*' component={Page} />
      </div>
      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  )
}

export default Index
