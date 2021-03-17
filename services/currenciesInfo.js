const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.restcountriesUrl;
const CODE_ENDPOINT = config.codeEndpoint;

class CountriesInfoService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get(code) {
    const result = await this.httpRequest.get(CODE_ENDPOINT, code);
    if (result && result.currencies && result.currencies.length) {
      const currency = {
        currencyName: result.currencies[0].name,
        currencyCode: result.currencies[0].code,
      };
      return currency;
    }
    return {};
  }
}

module.exports = CountriesInfoService;
