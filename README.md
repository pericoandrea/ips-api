# IPs Information API
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Provide information associated with an IP that allows the execution of response actions against fraud.

## Features
The principal information retrive about the  IP address requested is:
- Country Name
- Country Code
- Currency
- Rate Exchange base in EUR

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
- [Swagger](https://swagger.io/) - 

## Installation
The API requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
node server
```

For production environments...

```sh
npm install --production
NODE_ENV=production node server
```

## Use

## Test

## Docker
#### PROD
* Build image
``docker build -t ips-api-image -f prod.Dockerfile .``
* Run container
``docker run --name ips-api --rm -p 3000:3000 ips-api-image``
#### DEV
* Build image
``docker build -t ips-api-image -f prod.Dockerfile .``
* Run container
``docker run --rm --name ips-api -p 3000:3000 -v //your/local/repository/path://container/path ips-api-image``

## License
MIT