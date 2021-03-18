const countriesMock = [
  {
    _id: { $oid: '605220b4fc13ae28b50003eb' },
    countryName: 'Poland',
    countryCode: 'PL',
    currencyName: 'Zloty',
    currencyCode: 'PLN',
    currencyDate: '2021-01-08',
    currencyBase: 'Euro',
    currencyRate: '3.75',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003ec' },
    countryName: 'United States',
    countryCode: 'US',
    currencyName: 'Dollar',
    currencyCode: 'USD',
    currencyDate: '2020-05-03',
    currencyBase: 'Dinar',
    currencyRate: '2.75',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003ed' },
    countryName: 'Uruguay',
    countryCode: 'UY',
    currencyName: 'Peso',
    currencyCode: 'UYU',
    currencyDate: '2020-10-16',
    currencyBase: 'Yuan Renminbi',
    currencyRate: '7.47',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003ee' },
    countryName: 'Russia',
    countryCode: 'RU',
    currencyName: 'Ruble',
    currencyCode: 'RUB',
    currencyDate: '2020-07-17',
    currencyBase: 'Lempira',
    currencyRate: '8.05',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003ef' },
    countryName: 'Sweden',
    countryCode: 'SE',
    currencyName: 'Krona',
    currencyCode: 'SEK',
    currencyDate: '2021-03-15',
    currencyBase: 'Rupiah',
    currencyRate: '8.13',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003f0' },
    countryName: 'Gabon',
    countryCode: 'GA',
    currencyName: 'Franc',
    currencyCode: 'XAF',
    currencyDate: '2020-07-10',
    currencyBase: 'Euro',
    currencyRate: '3.28',
  },
  {
    _id: { $oid: '605220b4fc13ae28b50003f1' },
    countryName: 'Czech Republic',
    countryCode: 'CZ',
    currencyName: 'Koruna',
    currencyCode: 'CZK',
    currencyDate: '2021-03-16',
    currencyBase: 'Yen',
    currencyRate: '2.70',
  },
];

function filteredCountriesMock(countryCode) {
  return countriesMock.filter((country) =>
    country.countryCode.includes(countryCode)
  );
}

class CountriesServiceMock {
  async getCountry(countryCode){
    const countryDB = countriesMock.find((country) =>
    country.countryCode.match(countryCode)
  ) || {};
    delete countryDB._id;
    return Promise.resolve(countryDB);
  }

  async createCountry(){
    
    return Promise.resolve(countriesMock[0]._id);
  }
}
module.exports = {
  countriesMock,
  filteredCountriesMock,
  CountriesServiceMock
};
