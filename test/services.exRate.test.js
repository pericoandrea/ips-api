const assert = require('assert');
const proxyquire = require('proxyquire');

const { HttpReqMock, getStub } = require('../utils/mocks/httpReqLib');

describe('services - Countries Info', function () {
  const ExchangeRateService = proxyquire('../services/exchangeRate', {
    '../lib/httpRequest': HttpReqMock,
  });

  const exchangeRateService = new ExchangeRateService();

  describe('when get method is called', async function () {
    it('should call the get HttpRequestLib method', async function () {
      await exchangeRateService.get('CZK');
      assert.strictEqual(getStub.called, true);
    });

    it('should return the exchange rate currency information', async function () {
      const result = await exchangeRateService.get('RUB');
      const expected = {
        currencyBase: 'Lempira',
        currencyDate: '2020-07-17',
        currencyRate: '8.05',
      };
      assert.deepStrictEqual(result, expected);
    });
  });
});
