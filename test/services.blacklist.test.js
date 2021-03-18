const assert = require('assert');
const proxyquire = require('proxyquire').noPreserveCache();

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const {   filteredBlacklistMock } = require('../utils/mocks/blacklist');

describe('Services - blacklist', function() {
  const BlacklistService = proxyquire('../services/blacklist', {
    '../lib/mongo': MongoLibMock
  });

  const blacklistService = new BlacklistService();

  describe('when getIp method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await blacklistService.getIp({ip:'216.126.58.12'});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return the IP address info', async function() {
      const result = await blacklistService.getIp({ip:'204.230.79.19'});
      const expected =   filteredBlacklistMock('204.230.79.19')[0];
      assert.deepStrictEqual(result, expected);
    });
  });
});