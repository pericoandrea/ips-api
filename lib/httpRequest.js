const axios = require('axios');

class HttpRequest {
  constructor(url) {
    this.url = url;
  }

  async get(endpoint, params) {
    return axios.get(`${this.url}/${endpoint}${params}`).then((response) => {
      return response.data || {};
    });
  }
}
module.exports = HttpRequest;
