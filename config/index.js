
require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  ip2countryUrl: process.env.IP2COUNTRY_URL,
  ip2countryEndpoint: process.env.IP2COUNTRY_ENDPOINT,
  restcountriesUrl: process.env.RESTCOUNTRIES_URL,
  codeEndpoint: process.env.CODE_ENDPOINT,
  exchangeratesUrl: process.env.EXCHANGERATES_URL,
  ratesEndpoint: process.env.RATES_ENDPOINT

}

module.exports = { config };