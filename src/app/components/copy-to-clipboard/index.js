const React = require('react')
const get = require('lodash/get')
const omit = require('lodash/omit')
const mapKeys = require('lodash/mapKeys')
const ClipboardButton = require('react-clipboard.js')

class CopyToClipboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: get(props, 'children'),
      original: get(props, 'children'),
      tally: 0
    }
    this.onSuccess = this.onSuccess.bind(this)
    this.reset = this.reset.bind(this)
  }
  onSuccess () {
    let onSuccess = get(this.props, 'onSuccess')
    onSuccess && onSuccess()
    this.setState({
      text: 'Copied!',
      tally: get(this.state, 'tally') + 1
    })
    setTimeout(this.reset, 3000)
  }
  reset () {
    const tally = get(this.state, 'tally') - 1
    const change = {
      tally
    }
    if (!tally) {
      change.text = get(this.state, 'original')
    }
    this.setState(change)
  }
  render () {
    const filteredProps = omit(this.props, [
      'children',
      'onSuccess'
    ])
    const mappedProps = mapKeys(filteredProps, (value, key) => {
      return `button-${key}`
    })
    console.log(mappedProps)
    return <ClipboardButton {...mappedProps} onSuccess={this.onSuccess}>{get(this.state, 'text')}</ClipboardButton>
  }
}

module.exports = CopyToClipboard
