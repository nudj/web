const { StyleSheet } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    position: 'relative'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  controls: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    display: 'flex',
    zIndex: '100',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 150ms'
  },
  controlsOnlyOnHover: {
    opacity: 0,
    ':hover': {
      opacity: 1
    }
  }
})

module.exports = styleSheet
