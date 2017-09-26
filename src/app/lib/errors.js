function DataError (args) {
  this.name = 'DataError'
  Object.assign(this, args)
}
DataError.prototype = Object.create(Error.prototype)
DataError.prototype.constructor = DataError

module.exports = {
  DataError
}
