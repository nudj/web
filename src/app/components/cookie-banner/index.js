const React = require('react')
const cookies = require('js-cookie')

const { Banner, Text, Button } = require('@nudj/components')

const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

class CookieBanner extends React.Component {
  state = {
    shouldRender: false
  }

  componentDidMount () {
    if (!cookies.get('cookiesEnabled')) {
      this.setState({
        shouldRender: true
      })
    }
  }

  handleAccept = () => {
    this.setState({
      shouldRender: false
    }, () => {
      cookies.set('cookiesEnabled', true, { expires: 3650 })
    })
  }

  handleDecline = () => {
    this.setState({
      shouldRender: false
    }, () => {
      cookies.set('cookiesEnabled', false, { expires: 3650 })
    })
  }

  render () {
    const { shouldRender } = this.state

    if (!shouldRender) return null

    return (
      <Banner style={style.root}>
        <Text style={style.text}>
          We&apos;d like to use cookies to give you a great experience. Find out more in{' '}
          <a className={css(style.privacyLink)} href='https://help.nudj.co/pricing-privacy-and-terms/nudj-cookie-policy'>
            our cookie policy
          </a>.
        </Text>
        <Button
          id='accept-cookies'
          onClick={this.handleAccept}
          style={style.button}
          nonsensitive
          volume='cheer'
          subtle
        >
          Okay
        </Button>
        <Button
          style={style.button}
          onClick={this.handleDecline}
          nonsensitive
          volume='murmur'
          subtle
        >
          No thanks
        </Button>
      </Banner>
    )
  }
}

module.exports = CookieBanner
