const chai = require('chai')
chai.use(require('chai-as-promised'))
chai.use(require('dirty-chai'))
chai.use(require('sinon-chai'))
global.expect = chai.expect
