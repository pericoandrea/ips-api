const BlacklistService = require('../services/blacklist');
const CountriesService = require('../services/countries');
const CountriesInfoService = require('../services/countriesInfo');
const CurrenciesInfoService = require('../services/currenciesInfo');
const ExchangeRateService = require('../services/exchangeRate');

class IpsController {
  constructor() {
    this.blacklistService = new BlacklistService();
    this.countriesService = new CountriesService();
    this.countriesInfoService = new CountriesInfoService();
    this.currenciesInfoService = new CurrenciesInfoService();
    this.exchangeRateService = new ExchangeRateService();
  }

  async validate(req, res, next) {
    const { ip } = req.params;
    try {
      // Search the ip in the database
      const ipBlacklist = await this.blacklistService.getIp({ ip });
      //Get IP info if It does not exists in the database
      if (Object.keys(ipBlacklist).length === 0) {
        const countryInfo = await this.countriesInfoService.get({ ip });
        let country = {};
        if (Object.keys(countryInfo).length > 0) {
          // Get country and currency info from database
          country = await this.countriesService.getCountry(
            countryInfo.countryCode
          );
          //If the country does not exists in the database, get info from 3th-party services
          if (Object.keys(country).length === 0) {
            const currencyInfo = await this.currenciesInfoService.get(
              countryInfo.countryCode
            );
            const exchangeRate = await this.exchangeRateService.get(
              currencyInfo && currencyInfo.currencyCode
            );
            country = {
              ...countryInfo,
              ...currencyInfo,
              ...exchangeRate,
            };
            await this.countriesService.createCountry({ ...country });
          }
        }
        await this.blacklistService.createIp({ ip });
        return res
          .status(200)
          .json({ success: true, message: '', data: { ...country } });
      }
      // Response when IP was already banned
      return res.status(200).json({
        success: true,
        message: 'IP address has already been banned',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = IpsController;
