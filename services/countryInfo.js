const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.ip2countryUrl;
const ENDPOINT = config.ip2countryEndpoint;

class CountryInfoService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get({ip}) {
    return await this.httpRequest.get(ENDPOINT, ip);
  }
}

module.exports = CountryInfoService;