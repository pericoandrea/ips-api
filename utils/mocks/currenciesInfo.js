const currenciesInfoMock = [
  {
    countryCode: 'DK',
    currencyName: 'Krone',
    currencyCode: 'DKK',
    currencyDate: '2020-06-04',
    currencyBase: 'Sol',
    currencyRate: '2.24',
  },
  {
    countryCode: 'KR',
    currencyName: 'Won',
    currencyCode: 'KRW',
    currencyDate: '2020-12-02',
    currencyBase: 'Peso',
    currencyRate: '9.28',
  },
  {
    countryCode: 'ID',
    currencyName: 'Rupiah',
    currencyCode: 'IDR',
    currencyDate: '2020-07-09',
    currencyBase: 'Euro',
    currencyRate: '1.59',
  },
  {
    countryCode: 'PL',
    currencyName: 'Zloty',
    currencyCode: 'PLN',
    currencyDate: '2021-01-08',
    currencyBase: 'Euro',
    currencyRate: '3.75',
  },
  {
    countryCode: 'US',
    currencyName: 'Dollar',
    currencyCode: 'USD',
    currencyDate: '2020-05-03',
    currencyBase: 'Dinar',
    currencyRate: '2.75',
  },
  {
    countryCode: 'UY',
    currencyName: 'Peso',
    currencyCode: 'UYU',
    currencyDate: '2020-10-16',
    currencyBase: 'Yuan Renminbi',
    currencyRate: '7.47',
  },
  {
    countryCode: 'RU',
    currencyName: 'Ruble',
    currencyCode: 'RUB',
    currencyDate: '2020-07-17',
    currencyBase: 'Lempira',
    currencyRate: '8.05',
  },
  {
    countryCode: 'SE',
    currencyName: 'Krona',
    currencyCode: 'SEK',
    currencyDate: '2021-03-15',
    currencyBase: 'Rupiah',
    currencyRate: '8.13',
  },
  {
    countryCode: 'CZ',
    currencyName: 'Koruna',
    currencyCode: 'CZK',
    currencyDate: '2021-03-16',
    currencyBase: 'Yen',
    currencyRate: '2.70',
  },
];

function findCurrencyInfoMock(countryCode) {
  const currencies = currenciesInfoMock.find((currencyInfo) =>
    currencyInfo.countryCode.match(countryCode)
  );
  return {
    currencies: [
      { name: currencies.currencyName, code: currencies.currencyCode },
    ],
  };
}

function findExRateMock(currencyCode) {
  const exRates = currenciesInfoMock.find((exRate) =>
    exRate.currencyCode.match(currencyCode)
  );
  const result = { 
    date: exRates.currencyDate,
    base: exRates.currencyBase,
    rates: {}
  }
  result.rates[currencyCode] = exRates.currencyRate;
  return result;
}

class CurrenciesInfoServiceMock {
  async get(countryCode) {
    const {
      currencyName,
      currencyCode,
    } = currenciesInfoMock.find((currencyInfo) =>
      currencyInfo.countryCode.match(countryCode)
    );
    return Promise.resolve({ currencyName, currencyCode });
  }
}
class ExRateServiceMock {
  async get(currencyCode) {
    const {
      currencyDate,
      currencyBase,
      currencyRate,
    } = currenciesInfoMock.find((exRate) =>
      exRate.currencyCode.match(currencyCode)
    );
    return Promise.resolve({
      currencyDate,
      currencyBase,
      currencyRate,
    });
  }
}
module.exports = {
  currenciesInfoMock,
  findCurrencyInfoMock,
  CurrenciesInfoServiceMock,
  findExRateMock,
  ExRateServiceMock,
};
