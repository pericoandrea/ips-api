
//const { ipsMock } = require('../utils/mocks/ips'); // TODO: BORRAR MOCK

const MongoLib = require('../lib/mongo');

class CountriesService {
  constructor() {
    this.collection = 'countries';
    this.mongoDB = new MongoLib();
  }


  async getCountry(code) {
    const countries = await this.mongoDB.getAll(
      this.collection,
      {countryCode3: code}
    );
    return countries.length > 0 ? countries[0] : {};
  }

  async createCountry(data) {
    return await this.mongoDB.create(this.collection, data);
  }
}

module.exports = CountriesService;