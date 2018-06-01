const get = () => ({
  hire: {
    protocol: process.env.HIRE_PROTOCOL,
    hostname: process.env.HIRE_HOST
  }
})

module.exports = {
  get
}
