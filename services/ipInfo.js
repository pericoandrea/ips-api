const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.ip2countryUrl;
const ENDPOINT = config.ip2countryEndpoint;

class IpInfoService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get({ ip }) {
    const result = await this.httpRequest.get(ENDPOINT, ip);
    if (
      result &&
      result.countryCode3 &&
      result.countryCode3.length > 0
    ) {
      return {
        countryName: result.countryName,
        countryCode: result.countryCode3,
      };
    }
    return {};
  }
}

module.exports = IpInfoService;
