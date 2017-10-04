const React = require('react')
const { Collapse } = require('react-collapse')
const get = require('lodash/get')
const { merge } = require('@nudj/library')

const getStyle = require('./collapse-box.css')

class CollapseBox extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {
      visible: props.isOpened,
      transitionConfig: props.transitionConfig,
      js: false
    }
  }

  componentDidMount () {
    this.setState({
      js: true
    })
  }

  componentWillReceiveProps (props) {
    if (props.isOpened !== this.state.visible) {
      this.setState({ visible: props.isOpened })
    }
  }

  render () {
    const defaultConfig = { stiffness: 300, damping: 40 }
    const config = merge(defaultConfig, get(this.state, 'transitionConfig', {}))

    const collapsibleDisplay = (
      <Collapse isOpened={this.state.visible} springConfig={config}>
        {this.props.children}
      </Collapse>
    )

    const plainDisplay = (
      <div className={this.style.plainDisplay}>
        {this.props.children}
      </div>
    )

    return this.state.js ? collapsibleDisplay : plainDisplay
  }
}

module.exports = CollapseBox
