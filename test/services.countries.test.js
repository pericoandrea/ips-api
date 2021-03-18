const assert = require('assert');
const proxyquire = require('proxyquire').noPreserveCache();

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { filteredCountriesMock } = require('../utils/mocks/countries');

describe('Services - countries DB', function() {
  const CountriesService = proxyquire('../services/countries', {
    '../lib/mongo': MongoLibMock
  });

  const countriesService = new CountriesService();

  describe('when getCountry method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await countriesService.getCountry('UY');
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return the country info', async function() {
      const result = await countriesService.getCountry('UY');
      const expected = filteredCountriesMock('UY')[0];
      assert.deepStrictEqual(result, expected);
    });
  });
});