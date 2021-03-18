const ipInfoMock = [
  {
    ip: "169.168.199.86",
    countryName: 'Denmark',
    countryCode: 'DK',
    },
  {
    ip: "235.43.42.116",
    countryName: 'South Korea',
    countryCode: 'KR',
    },
  {
    ip: "192.143.93.110",
    countryName: 'Indonesia',
    countryCode: 'ID',
    },
  {
    ip: "207.124.122.247",
    countryName: 'Poland',
    countryCode: 'PL',
    },
  {
    ip: "57.111.208.230",
    countryName: 'United States',
    countryCode: 'US',
    },
  {
    ip: "164.115.195.212",
    countryName: 'Uruguay',
    countryCode: 'UY',
    },
  {
    ip: "143.110.137.54",
    countryName: 'Russia',
    countryCode: 'RU',
    },
  {
    ip: "225.241.197.76",
    countryName: 'Sweden',
    countryCode: 'SE',
    },
  {
    ip: "4.59.254.177",
    countryName: 'Gabon',
    countryCode: 'GA',
    },
  {
    ip: "151.147.71.125",
    countryName: 'Czech Republic',
    countryCode: 'CZ',
    },
];

function findIpInfoMock(ip) {
  const ipMock = ipInfoMock.find((ipInfo) => ipInfo.ip.match(ip));
  return {...ipMock, countryCode3: ipMock.countryCode}
}

class IpInfoServiceMock {
  async get({ ip }){
    const {countryName, countryCode} = findIpInfoMock(ip);
    return Promise.resolve({
      countryName,
      countryCode
    });
  }
}
module.exports = {
  ipInfoMock,
  findIpInfoMock,
  IpInfoServiceMock
};
