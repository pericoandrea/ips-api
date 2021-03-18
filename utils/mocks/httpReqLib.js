const sinon = require('sinon');

const { findCurrencyInfoMock, findExRateMock } = require('./currenciesInfo');
const { findIpInfoMock } = require('./ipInfo');

const getStub = sinon.stub();

getStub.withArgs('endpoint','CZ').resolves(findCurrencyInfoMock('CZ'));
getStub.withArgs('endpoint','225.241.197.76').resolves(findIpInfoMock('225.241.197.76'));
getStub.withArgs('endpoint','&symbols=RUB').resolves(findExRateMock('RUB'));

class HttpReqMock {
  async get(endpoint, params) {
    return Promise.resolve(getStub('endpoint', params));
  }
}

module.exports = {
  getStub,
  HttpReqMock
};