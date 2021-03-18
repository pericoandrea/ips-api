const assert = require('assert');
const proxyquire = require('proxyquire');

const { HttpReqMock, getStub } = require('../utils/mocks/httpReqLib');

describe('Services - Ip Info', function () {
  const IpInfoService = proxyquire('../services/ipInfo', {
    '../lib/httpRequest': HttpReqMock,
  });

  const ipInfoService = new IpInfoService();

  describe('when get method is called', async function () {
    it('should call the get HttpReqLib method', async function () {
      await ipInfoService.get({ ip: '225.241.197.76' });
      assert.strictEqual(getStub.called, true);
    });

    it('should return the IP info', async function () {
      const result = await ipInfoService.get({ ip: '225.241.197.76' });
      const expected = { countryCode: 'SE', countryName: 'Sweden' };
      assert.deepStrictEqual(result, expected);
    });
  });
});
