const Prismic = require('prismic.io')

class PrismicApi {
  constructor ({accessToken, repo}) {
    this.accessToken = accessToken
    this.repo = repo
    this.repoUrl = `https://${this.repo}.prismic.io/api`
  }

  fetchContent (documentQuery = {}, returnOne = false) {
    const request = Prismic.api(this.repoUrl, {accessToken: this.accessToken})
      .then(api => this.queryDocuments({api, documentQuery}))
      .then(response => {
        if (!returnOne) {
          return response.results
        }
        return response.results.length ? response.results[0] : undefined
      })
      .catch(error => this.handleErrors(error))

    return request
  }

  handleErrors (error) {
    console.error('error', error)
    // DO ERROR HANDLING
    // throw new Error(error)
  }

  predicatesOperator (key) {
    switch (key) {
      case 'document.tags':
        return Prismic.Predicates.any
      default:
        return Prismic.Predicates.at
    }
  }

  queryDocuments ({api, documentQuery}) {
    // An empty query SHOULD return all the documents // need to make sure this still happens // ?
    const prismicQuery = Object.keys(documentQuery).map(key => this.predicatesOperator(key)(key, documentQuery[key]))
    // calling api.query('') will return all documents
    return api.query(prismicQuery)
  }
}

module.exports = (...args) => new PrismicApi(...args)
