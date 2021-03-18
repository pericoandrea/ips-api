const assert = require('assert');
const proxyquire = require('proxyquire');

const { HttpReqMock, getStub } = require('../utils/mocks/httpReqLib');

describe('services - Countries Info', function () {
  const CurrenciesInfoService = proxyquire('../services/currenciesInfo', {
    '../lib/httpRequest': HttpReqMock
  });

  const currenciesInfoService = new CurrenciesInfoService();

  describe('when get method is called', async function () {
    it('should call the get HttpRequestLib method', async function () {
      await currenciesInfoService.get('CZ');
      assert.strictEqual(getStub.called, true);
    });

    it('should return the currency info', async function () {
      const result = await currenciesInfoService.get('CZ');
      const expected = { currencyName: 'Koruna', currencyCode: 'CZK' };
      assert.deepStrictEqual(result, expected);
    });
  });
});
