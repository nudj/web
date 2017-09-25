const { promiseMap } = require('@nudj/library')

const prismic = require('../lib/prismic')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports.getRandom = function ({ type, tags, keys }) {
  return prismic.fetchContent({ type, tags, keys })
    .then(results => results[getRandomInt(0, results.length)])
}
