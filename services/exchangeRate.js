const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.exchangeratesUrl;
const RATES_ENDPOINT = config.ratesEndpoint;

class ExchangeRateService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get(symbol) {
    //TODO: VALIDATE FIRTS IN REDIS
    const rate = await this.httpRequest.get(RATES_ENDPOINT, `&symbols=${symbol}`);
    return { date: rate.date, base: rate.base, ...rate.rates }
  }
}

module.exports = ExchangeRateService;