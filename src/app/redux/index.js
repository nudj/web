const React = require('react')
const { Helmet } = require('react-helmet')
const isEqual = require('lodash/isEqual')
const cookies = require('js-cookie')

const analytics = require('../lib/browser-analytics')

class ReduxRoot extends React.Component {
  componentDidMount () {
    if (!cookies.get('mixpanelDistinctId')) {
      cookies.set('mixpanelDistinctId', analytics.getId(), {
        domain: 'nudj.co',
        expires: 3650 // 10 years
      })
    }

    if (this.props.userId) {
      analytics.identify({ id: this.props.userId })
    }

    analytics.track({
      object: analytics.objects.page,
      action: analytics.actions.page.viewed,
      properties: {
        pathname: this.props.location.pathname,
        search: this.props.location.search,
        hash: this.props.location.hash
      }
    })
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps.location, this.props.location)) {
      analytics.track({
        object: analytics.objects.page,
        action: analytics.actions.page.viewed,
        properties: {
          pathname: this.props.location.pathname,
          search: this.props.location.search,
          hash: this.props.location.hash
        }
      })
    }
  }

  render () {
    return (
      <div className={`${this.props.className}`}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>nudj - Connecting Great People With Awesome Companies</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
          <meta name='title' content='nudj - Connecting great people with awesome companies.' />
          <meta property='og:description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
          <meta property='og:type' content='article' />
          <meta property='og:title' content='nudj - Connecting great people with awesome companies.' />
          <meta property='og:site_name' content='nudj' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='nudj - Connecting great people with awesome companies.' />
          <meta name='twitter:image' content='https://assets.nudj.co/assets/images/social/nudj-card-og.jpg' />
          <meta name='twitter:description' content='nudj makes it effortless for the best businesses to engage with the best talent, utilising connections they both have.' />
          <meta property='og:image' content='https://assets.nudj.co/assets/images/social/nudj-card-og.jpg' />
          <link rel='icon' href='/assets/images/nudj-square.ico' type='image/x-icon' />
          <link rel='stylesheet' href='/assets/css/libs.min.css' />
        </Helmet>
        {this.props.children}
      </div>
    )
  }
}

module.exports = ReduxRoot
