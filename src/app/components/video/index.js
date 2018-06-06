const React = require('react')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const { IconButton } = require('@nudj/components')
const defaultStyleSheet = require('./style.css')

class Video extends React.Component {
  state = {
    playing: false
  }

  togglePlay = (e) => {
    e.stopPropagation()

    this.setState(state => {
      if (!state.playing) {
        this.video.play()
      } else {
        this.video.pause()
      }

      return {
        playing: !state.playing
      }
    })
  }

  getVideoRef = c => {
    this.video = c
  }

  render () {
    const {
      styleSheet,
      controls,
      children,
      ...rest
    } = this.props

    const {
      playing
    } = this.state

    const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

    return (
      <div className={css(style.root)}>
        <video
          ref={this.getVideoRef}
          {...rest}
          muted
          className={css(style.video)}
          controls={false}
          onClick={this.togglePlay}
        >
          {children}
        </video>
        <div
          className={css(
            style.controls,
            playing && style.controlsOnlyOnHover
          )}
        >
          <IconButton
            onClick={this.togglePlay}
            volume='cheer'
            iconName={playing ? 'pause' : 'play'}
          />
        </div>
      </div>
    )
  }
}

module.exports = Video
