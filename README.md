# IPs Information API
Provide information associated with an IP address that allows the execution response actions against fraud.

### GIT Repository
[https://github.com/pericoandrea/ips-api](https://github.com/pericoandrea/ips-api)
```ssh
git clone https://github.com/pericoandrea/ips-api.git
```
------------
## Features
The information retrive about the  IP address requested is:
- *Country Name:* The country name where the IP address is come from
- *Country Code:* The country code where the IP address is come from
- *Currency Name:* The currency name of the country where the IP address is come from
- *Currency Code:* The currency code of the country where the IP address is come from
- *Currency Date:* The date when the exchange currency rate was load
- *Currency Base:* The currency code which the exchange currency rate is based on
- *Currency Rate:* The exchange currency rate of the country where the IP address is come from

If the IP address has been requested before, the service does not retrive information about the IP.

## Third-Party Services.
The API uses third-party services to obtain all information about IP:
- IP Geolocation JSON API: [https://ip2country.info/](https://ip2country.info/)
- REST Countries: [http://restcountries.eu/](http://restcountries.eu/)
- Foreign exchange rates and currency conversion JSON API: [http://fixer.io/](http://fixer.io/)

## Tech
The API uses a number of open source projects to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Swagger] - API Documentation


------------

## Installation
1. The API requires [Node.js](https://nodejs.org/) v10+ to run.

2. The next environment variables must the defined in the host in order to     operate correctly:
    - `PORT` *(default: 3000)*
      The port number where API will be listening
    - `DB_USER`
      MongoDB username
    - `DB_PASSWORD`
      MongoDB password
    - `DB_HOST`
      MongoDB server location, i.e an IP address (127.0.0.1) or a DNS (localhost)
    - `IP2COUNTRY_URL` *(default: https://api.ip2country.info)* 
      The URL for IP Geolocation JSON API [https://ip2country.info/](https://ip2country.info/)
    - `IP2COUNTRY_ENDPOINT` *(default: ip?)*
      The Endpoint for IP Geolocation JSON API
    - `RESTCOUNTRIES_URL` *(default: https://restcountries.eu/rest/v2)*
      The ULR for REST Countries API [http://restcountries.eu/](http://restcountries.eu/)
    - `CODE_ENDPOINT` *(default: alpha/)*
      The Endpoint for REST Countries API
    - `EXCHANGERATES_URL` *(default: http://data.fixer.io/api/)*
      The URL for foreign exchange rates and currency conversion JSON API [http://fixer.io/](http://fixer.io/)
    - `EXRATES_ACCESSKEY` Get an Fixer API key is required, Fixer allow get free API key at [https://fixer.io/signup/free](https://fixer.io/signup/free)
    - `RATES_ENDPOINT` *(default: latest?access_key=${process.env.EXRATES_ACCESSKEY}&)*
      - The Endpoint for foreign exchange rates and currency conversion JSON API, get an API key is required. `i.e latest?access_key=ca486fcddff586ba467256cbad7412cd&`
      - In another hand, this variable can be let undefined and it will be set by default with the EXRATES_ACCESSKEY environment variable value.

3. Install the dependencies  and start the server.

    For development enviroments...
      ```sh
      npm i
      DEBUG=app:* nodemon server
      ```
    For production environments...
      ```sh
      npm install --production
      NODE_ENV=production node server
      ```

## Test
For running test...
```sh
npm test
```

For get source mapped coverage..
```sh
npm run test:cover
```

For get test coverage report in html
```sh
npm run test:report
```

## Docker
For development enviroments...

* Build image
  ```sh
  docker build -t ips-api-image -f dev.Dockerfile .
  ```

* Install NPM dependencies in your local repository before run dev container because the repository files on the host machine are mounted into the container with the flag -v to the container can watching the files changes and automatically restarting the application without has to rebuild and restart the container.
  ```sh
  npm install
  ```
* Run container
  ```sh
  docker run --rm --name ips-api -p 3000:3000 -v //your/local/repository/path://usr/src ips-api-image
  ```

For production environments...
* Build image
  ```sh
  docker build -t ips-api-image -f prod.Dockerfile .
  ```
* Run container
  ```sh
  docker run --name ips-api --rm -p 3000:3000 ips-api-image
  ```
------------
## Usage

* ### Swagger Documentation
  [https://app.swaggerhub.com/apis-docs/hobbies/ips_information_api/1.0.0-oas3](https://app.swaggerhub.com/apis-docs/hobbies/ips_information_api/1.0.0-oas3)
* #### Request Example
  ```
  curl -X GET "https://ipsapi.vercel.app/api/ips/159.56.12.3" -H  "accept: application/json"
  ```
* #### Reques URL
  ```
  https://ipsapi.vercel.app/api/ips/159.56.12.3
  ```
* #### Response example for an IP address that was not queried before
  ```json
  {
    "success": true,
    "message": "",
    "data": {
      "countryName": "United States",
      "countryCode": "USA",
      "currencyName": "United States dollar",
      "currencyCode": "USD",
      "currencyDate": "2021-03-23",
      "currencyBase": "EUR",
      "currencyRate": 1.185291
    }
  }
  ```
* #### Response example for an IP address that was queried before
  ```json
  {
    "success": true,
    "message": "IP address has already been banned",
    "data": {}
  }
  ```

------------
## License
MIT