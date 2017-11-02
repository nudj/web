const request = require('../lib/request')
const queries = require('../lib/queries-mutations')

module.exports.getByPixelToken = async (pixelToken) => {
  const data = await request(queries.GetMessageByPixelToken, { pixelToken })
  return data.message
}

module.exports.updateReadCount = async (id, input) => {
  const data = await request(queries.UpdateMessageReadCount, { id, input })
  return data.message
}
