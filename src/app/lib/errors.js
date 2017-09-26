function DataError (message, data) {
  this.name = 'DataError'
  this.message = message
  this.data = data
}
DataError.prototype = Object.create(Error.prototype)
DataError.prototype.constructor = DataError

module.exports = {
  DataError
}
