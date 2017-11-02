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
      js: false
    }
  }

  componentDidMount () {
    this.setState({
      js: true
    })
  }

  render () {
    const defaultConfig = { stiffness: 300, damping: 40 }
    const config = merge(defaultConfig, get(this.props, 'transitionConfig', {}))

    const collapsibleDisplay = (
      <Collapse isOpened={this.props.isOpened} forceInitialAnimation springConfig={config}>
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
