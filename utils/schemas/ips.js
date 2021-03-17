const joi = require('@hapi/joi');

const ipSchema = joi.string().ip({
  version: [
    'ipv4',
    'ipv6',
  ],
  cidr: 'forbidden'
}).required();

module.exports = {
  ipSchema
};