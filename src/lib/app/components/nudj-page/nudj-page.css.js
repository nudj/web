import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  page: mixins.flexColumn({
    backgroundImage: mixins.linkImage('img-paper-planes-together-mobile.svg'),
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [mixins.breakpoints.ns]: {
      backgroundImage: mixins.linkImage('img-paper-planes-together.svg')
    },
    [mixins.breakpoints.l]: {
      backgroundPosition: 'top center',
      backgroundSize: 'cover'
    }
  }),
  box: mixins.basicContainerMedium(),
  heading: merge({}, mixins.typography.title),
  tip: mixins.basicContainerSmaller(mixins.makeGreyWobbleBox()),
  tipTitle: merge({}, mixins.typography.h3, {
    marginBottom: variables.padding.e
  }),
  tipBody: merge({
    color: variables.colours.charcoal,
    textAlign: 'center'
  }, mixins.headings.p2)
}

export default css(styles)
