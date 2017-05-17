import css, { merge, mixins, variables } from '../../lib/css'

const styles = {
  content: mixins.basicContainerSmaller({
    paddingBottom: variables.padding.b,
    textAlign: 'center'
  }),
  header: merge({}, mixins.typography.title, {
    padding: `${variables.padding.c} 0`
  }),
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
