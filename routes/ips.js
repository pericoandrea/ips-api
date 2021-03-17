const express = require('express');
const IpsController = require('../controllers/ips');

const { ipSchema } = require('../utils/schemas/ips');

const validationHandler = require('../utils/middleware/validationHandler');

const router = express.Router();
const ipsController = new IpsController();

router.get(
    '/:ip',
    validationHandler({ ip: ipSchema }, 'params'),
    ipsController.validate.bind(ipsController)
  );


module.exports = router;