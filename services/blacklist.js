const MongoLib = require('../lib/mongo');

class BlacklistService {
  constructor() {
    this.collection = 'blacklist';
    this.mongoDB = new MongoLib();
  }


  async getIp({ip}) {
    const ipsFound = await this.mongoDB.getAll(this.collection, {ip});
    return ipsFound.length > 0 ? ipsFound[0] : {};
  }

  async createIp(data) {
    return await this.mongoDB.create(this.collection, data);
  }
}

module.exports = BlacklistService;