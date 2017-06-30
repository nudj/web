import css, { merge, mixins, variables } from '../../lib/css'

const topHeight = '422px'
const topWidth = '268px'

const topPlane = mixins.makePsuedoElement({
  backgroundImage: mixins.linkImage('paper-planes-01.svg'),
  backgroundPosition: 'top right',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: `calc(${topHeight} * 0.5)`,
  pointerEvents: 'none',
  position: 'absolute',
  right: '0',
  top: '0',
  width: `calc(${topWidth} * 0.5)`,
  [mixins.breakpoints.l]: {
    height: topHeight,
    width: topWidth
  },
  [mixins.breakpoints.xl]: {
    right: `calc(50vw - ${variables.breakpoints.xl} * 0.5)`
  }
})

const bottomHeight = '341px'
const bottomWidth = '407px'

const bottomPlane = mixins.makePsuedoElement({
  backgroundImage: mixins.linkImage('paper-planes-02.svg'),
  backgroundPosition: 'bottom left',
  backgroundRepeat: 'no-repeat',
  backgroundSize: `calc(${bottomWidth} * 0.5) calc(${bottomHeight} * 0.5)`,
  height: `calc(${bottomHeight} * 0.5)`,
  pointerEvents: 'none',
  position: 'relative',
  width: '100%',
  [mixins.breakpoints.l]: {
    backgroundSize: `${bottomWidth} ${bottomHeight}`,
    bottom: '340px', // complete guess
    left: '0',
    height: bottomHeight,
    position: 'absolute',
    width: bottomWidth
  },
  [mixins.breakpoints.xl]: {
    left: `calc(50vw - ${variables.breakpoints.xl} * 0.5)`
  }
})

const styles = {
  page: mixins.flexColumn({
    '::before': topPlane,
    '::after': bottomPlane
  }),
  box: mixins.basicContainerMedium({
    padding: `${variables.padding.a} ${variables.padding.d} ${variables.padding.c} ${variables.padding.d}`,
    [mixins.breakpoints.l]: {
      paddingBottom: variables.padding.b
    }
  }),
  heading: merge({}, mixins.typography.title),
  success: merge({
    padding: `${variables.padding.c} 0`,
    textAlign: 'center'
  }, mixins.headings.p),
  tip: mixins.basicContainerSmaller(mixins.makeGreyWobbleBox({
    [mixins.breakpoints.l]: {
      margin: `${variables.padding.c} auto`
    }
  })),
  tipTitle: merge({}, mixins.typography.h3, {
    marginBottom: variables.padding.e
  }),
  tipBody: merge({
    color: variables.colours.charcoal,
    textAlign: 'center'
  }, mixins.headings.p2)
}

export default css(styles)
