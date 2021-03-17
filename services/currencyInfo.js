const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.restcountriesUrl;
const CODE_ENDPOINT = config.codeEndpoint;

class CountryInfoService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get(code) {
    //TODO: VALIDATE FIRTS IN REDIS
    const result = await this.httpRequest.get(CODE_ENDPOINT, code);
    if(result && result.currencies && result.currencies.length)
      return result.currencies[0];
    return {};
  }
}

module.exports = CountryInfoService;