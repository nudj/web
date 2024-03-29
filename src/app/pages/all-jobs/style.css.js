const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const heroTitle = merge(mixins.basicContainerMedium(), {
  color: variables.colors.royalBlue,
  paddingBottom: `${variables.padding.d}`,
  textAlign: 'center'
}, mixins.headings.h1)

const bodySubtitle = merge({
  color: variables.colors.royalBlue,
  paddingBottom: `${variables.padding.d}`,
  textAlign: 'center'
}, mixins.headings.h2)

const styles = {
  body: {
    position: 'relative'
  },
  break: {
    display: 'block',
    [mixins.breakpoints.ns]: {
      display: 'none'
    }
  },
  header: {
    textAlign: 'center'
  },
  hero: {
    padding: `${variables.padding.b} ${variables.padding.d}`,
    position: 'relative'
  },
  heroTitle: heroTitle,
  highlight: mixins.textHighlight(),
  jobsSection: mixins.makeGreyBackground({
    paddingTop: variables.padding.b,
    paddingBottom: variables.padding.b
  }),
  jobs: merge(mixins.basicContainer(), mixins.deList(), {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'left',
    alignItems: 'stretch',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    '@media(min-width: 55rem)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: variables.padding.d,
      paddingRight: variables.padding.d,
      paddingBottom: variables.padding.d,
      paddingLeft: variables.padding.d
    }
  }),
  job: merge({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: variables.colors.white,
    boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    paddingTop: variables.padding.d,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d,
    margin: variables.padding.f,
    flexBasis: '100%',
    ':first-child:last-child': {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '@media(min-width: 55rem)': {
      flexBasis: `calc(50% - ${variables.padding.d})`
    }
  }),
  secondaryTitle: merge({
    [mixins.breakpoints.ns]: mixins.makeOrangeSubtitleUnderlineOnGrey()
  }, bodySubtitle),
  bodyCopy: merge({
    color: variables.colors.charcoal,
    paddingBottom: variables.padding.d,
    textAlign: 'center'
  }, mixins.headings.p),
  cta: merge(mixins.flexColumn(), mixins.basicContainerMedium(), {
    paddingTop: variables.padding.b,
    paddingRight: variables.padding.d,
    paddingBottom: variables.padding.d,
    paddingLeft: variables.padding.d
  }),
  signupButton: merge(mixins.buttonPrimary(), {
    marginTop: variables.padding.e
  })
}

module.exports = css(styles)
