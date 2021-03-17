const assert = require('assert');
const proxyquire = require('proxyquire');

const { CountriesServiceMock } = require('../utils/mocks/countries.js');
const { BlacklistServiceMock } = require('../utils/mocks/ips.js');
const { CountriesInfoServiceMock } = require('../utils/mocks/countriesInfo.js');
const {
  CurrenciesInfoServiceMock,
  ExRateServiceMock,
} = require('../utils/mocks/currenciesInfo');

const testServer = require('../utils/testServer');

describe('routes - ips', function () {
  const controller = proxyquire('../controllers/ips', {
    '../services/blacklist': BlacklistServiceMock,
    '../services/countries': CountriesServiceMock,
    '../services/countriesInfo': CountriesInfoServiceMock,
    '../services/currenciesInfo': CurrenciesInfoServiceMock,
    '../services/exchangeRate': ExRateServiceMock,
  });

  const route = proxyquire('../routes/ips', {
    '../controllers/ips': controller,
  });

  const request = testServer(route);
  describe('GET /ips/:ip', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/ips/84.44.100.189').expect(200, done);
    });

    it('should respond that the IP address has already been banned', function (done) {
      request.get('/api/ips/84.44.100.189').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          success: true,
          message: 'IP address has already been banned',
          data: {},
        });

        done();
      });
    });

    it('should respond the information about the IP address', function (done) {
      request.get('/api/ips/4.59.254.177').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          success: true,
          message: '',
          data: {
            countryName: 'Gabon',
            countryCode: 'GA',
            currencyName: 'Franc',
            currencyCode: 'XAF',
            currencyDate: '2020-07-10',
            currencyBase: 'Euro',
            currencyRate: '3.28',
          },
        });

        done();
      });
    });
  });
});
