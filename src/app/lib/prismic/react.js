const Prismic = require('prismic.io')

class PrismicReact {
  constructor (doc) {
    this.doc = this.convertDocument(doc)
  }

  convertDocument (doc) {
    if (doc.get) {
      return doc
    }
    const {id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON} = doc
    const prismicDoc = new Prismic.Document(id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON)
    return prismicDoc
  }

  fragmentToText ({fragment}) {
    const prismicFragment = this.doc.get(fragment)

    if (!prismicFragment) {
      return ''
    }

    if (prismicFragment.value && !prismicFragment.blocks) {
      return prismicFragment.value.toString()
    }

    if (!prismicFragment.blocks) {
      return ''
    }

    const text = prismicFragment.blocks.map(block => block.text || '')

    return text.join('\n\n')
  }
}

module.exports = PrismicReact
