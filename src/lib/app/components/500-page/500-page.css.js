import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  content: mixins.basicContainerSmaller({
    textAlign: 'center'
  }),
  header: merge({
    paddingTop: variables.padding.d
  }, mixins.typography.title),
  copy: mixins.typography.copy,
  error: mixins.typography.copy,
  pages: {
    padding: `${variables.padding.d} 0`,
    textAlign: 'center'
  },
  links: merge(mixins.textHighlight({
    margin: variables.padding.e
  }), mixins.headings.pBold)
}

export default css(styles)
