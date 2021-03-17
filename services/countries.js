//const { ipsMock } = require('../utils/mocks/ips'); // TODO: BORRAR MOCK

const MongoLib = require('../lib/mongo');

class CountriesService {
  constructor() {
    this.collection = 'countries';
    this.mongoDB = new MongoLib();
  }

  async getCountry(countryCode) {
    const countries = await this.mongoDB.getAll(this.collection, {
      countryCode,
    });
    if (countries.length > 0) {
      delete countries[0]._id;
      return countries[0];
    }
    return {};
  }

  async createCountry(data) {
    return await this.mongoDB.create(this.collection, data);
  }
}

module.exports = CountriesService;
