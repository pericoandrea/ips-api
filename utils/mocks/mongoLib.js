const sinon = require('sinon');

const { blacklistMock, filteredBlacklistMock } = require('./blacklist');
const { countriesMock, filteredCountriesMock } = require('./countries');
const getAllStub = sinon.stub();

getAllStub.withArgs('blacklist', {ip:'204.230.79.19'}).resolves(  filteredBlacklistMock('204.230.79.19'));
getAllStub.withArgs('blacklist', {ip:'216.126.58.12'}).resolves(  filteredBlacklistMock('216.126.58.12'));
getAllStub.withArgs('countries', { countryCode:'UY'}).resolves(filteredCountriesMock('UY'));
getAllStub.withArgs('countries', { countryCode:'PL'}).resolves(filteredCountriesMock('UY'));

const createStub = sinon.stub()
createStub.withArgs('blacklist', blacklistMock[0]).resolves(blacklistMock[0]._id);
createStub.withArgs('countries', countriesMock[0]).resolves(countriesMock[0]._id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};