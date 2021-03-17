const BlacklistService = require('../services/blacklist');
const CountriesService = require('../services/countries');
const CountryInfoService = require('../services/countryInfo');
const CurrencyInfoService = require('../services/currencyInfo');
const ExchangeRateService = require('../services/exchangeRate');

//const { ipsMock } = require('../utils/mocks/ips'); //TODO: MOCKS

class IpsController {
  constructor() {
    this.blacklistService = new BlacklistService();
    this.countriesService = new CountriesService();
    this.countryInfoService = new CountryInfoService();
    this.currencyInfoService = new CurrencyInfoService();
    this.exchangeRateService = new ExchangeRateService();
  }

  async validate(req, res, next) {
    const { ip } = req.params;
    try {
      // Search the ip in the database
      const ipBlacklist = await this.blacklistService.getIp({ ip });
      //Get IP info if It does not exists in the database
      if (Object.keys(ipBlacklist).length === 0) {
        const countryInfo = await this.countryInfoService.get({ ip });
        let country = {};
        if (
          countryInfo &&
          countryInfo.countryCode3 &&
          countryInfo.countryCode3.length > 0
        ) {
          // Get country and currency info from database
          country = await this.countriesService.getCountry();
          //If the country does not exists in the database, get info from external services
          if (Object.keys(country).length === 0) {
            const currencyInfo = await this.currencyInfoService.get(
              countryInfo.countryCode3
            );
            const exchangeRate = await this.exchangeRateService.get(
              currencyInfo && currencyInfo.code
            );
            country = {
              ...countryInfo,
              currency: {
                ...currencyInfo,
                rate: { ...exchangeRate },
              },
            };
            await this.countriesService.createCountry({ ...country });
          }
          delete country._id;
        }
        await this.blacklistService.createIp({ ip });
        return res.status(200).json({ success: true, ip, ...country });
      }
      // Response when IP was already banned
      return res.status(200).json({
        success: true,
        ip,
        message: 'IP address has already been banned',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = IpsController;
