const HttpRequest = require('../lib/httpRequest');
const { config } = require('../config/index');

const URL = config.exchangeratesUrl;
const RATES_ENDPOINT = config.ratesEndpoint;

class ExchangeRateService {
  constructor() {
    this.httpRequest = new HttpRequest(URL);
  }

  async get(symbol) {
    const exRate = await this.httpRequest.get(
      RATES_ENDPOINT,
      `&symbols=${symbol}`
    );
    if (exRate && exRate.rates && exRate.rates[symbol]) {
      return {
        currencyDate: exRate.date,
        currencyBase: exRate.base,
        currencyRate: exRate.rates[symbol],
      };
    }
    return {};
  }
}

module.exports = ExchangeRateService;
