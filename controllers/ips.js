const BlacklistService = require('../services/blacklist');
const CountriesService = require('../services/countries');
const ipInfoService = require('../services/ipInfo');
const CurrenciesInfoService = require('../services/currenciesInfo');
const ExchangeRateService = require('../services/exchangeRate');

class IpsController {
  constructor() {
    this.blacklistService = new BlacklistService();
    this.countriesService = new CountriesService();
    this.ipInfoService = new ipInfoService();
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
        const ipInfo = await this.ipInfoService.get({ ip });
        if (Object.keys(ipInfo).length === 0) {
          return res
            .status(200)
            .json({
              success: true,
              message: 'There are not information about this IP address',
              data: {},
            });
        }
        // Get country and currency info from database
        let country = await this.countriesService.getCountry(ipInfo.countryCode);
        //If the country does not exists in the database, get info from 3th-party services
        if (Object.keys(country).length === 0) {
          const currencyInfo = await this.currenciesInfoService.get(
            ipInfo.countryCode
          );
          const exchangeRate = await this.exchangeRateService.get(
            currencyInfo && currencyInfo.currencyCode
          );
          country = {
            ...ipInfo,
            ...currencyInfo,
            ...exchangeRate,
          };
          await this.countriesService.createCountry({ ...country });
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
