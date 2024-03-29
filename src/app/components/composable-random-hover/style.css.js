const { StyleSheet } = require('@nudj/components/lib/css')

const SVG_HEIGHT = '2.8rem'
const ANIMATION_DURATION = 275
const hoverEffects = {
  left: 'assets/app/components/composable-random-hover/left-one.svg',
  right: 'assets/app/components/composable-random-hover/right-one.svg'
}

const styleSheet = StyleSheet.create({
  hoverEffect: {
    position: 'relative',
    transition: 'transform 275ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    transform: 'scale(1)',
    zIndex: 2,
    ':before': {
      backgroundImage: `url(${hoverEffects.left})`,
      content: '""',
      display: 'block',
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      height: `calc(100% + ${SVG_HEIGHT})`,
      pointerEvents: 'none',
      top: `calc(${SVG_HEIGHT} * -0.5)`,
      width: `calc(${SVG_HEIGHT} * 2)`,
      transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      opacity: '0',
      transform: 'scale3d(0.5, 0.5, 1)',
      backgroundPosition: 'left center',
      left: `calc(${SVG_HEIGHT} * -0.5)`,
      transformOrigin: 'center right',
      zIndex: 1
    },
    ':after': {
      content: '""',
      backgroundImage: `url(${hoverEffects.right})`,
      display: 'block',
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      height: `calc(100% + ${SVG_HEIGHT})`,
      pointerEvents: 'none',
      top: `calc(${SVG_HEIGHT} * -0.5)`,
      width: `calc(${SVG_HEIGHT} * 2)`,
      transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      opacity: '0',
      transform: 'scale3d(0.5, 0.5, 1)',
      backgroundPosition: 'right center',
      right: `calc(${SVG_HEIGHT} * -0.5)`,
      transformOrigin: 'center left',
      zIndex: 1
    },
    ':hover': {
      transform: 'scale(1.1)',
      ':before': {
        transform: 'scale3d(1.05, 1.05, 1)',
        opacity: 1
      },
      ':after': {
        transform: 'scale3d(1.05, 1.05, 1)',
        opacity: 1
      }
    }
  }
})

module.exports = styleSheet
