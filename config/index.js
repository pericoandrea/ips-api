
require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  ip2countryUrl: process.env.IP2COUNTRY_URL || 'https://api.ip2country.info',
  ip2countryEndpoint: process.env.IP2COUNTRY_ENDPOINT || 'ip?',
  restcountriesUrl: process.env.RESTCOUNTRIES_URL || 'https://restcountries.eu/rest/v2',
  codeEndpoint: process.env.CODE_ENDPOINT || 'alpha/',
  exchangeratesUrl: process.env.EXCHANGERATES_URL || 'http://data.fixer.io/api/',
  ratesEndpoint: process.env.RATES_ENDPOINT || `latest?access_key=${process.env.EXRATES_ACCESSKEY}&`

}

module.exports = { config };