const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express')
const { config } = require('./config/index');
const ipsRoutes = require('./routes/ips');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

const swaggerDoc =  require('./swagger.json');
// routes
app.use('/api/ips', ipsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// TODO: Ajustar health
app.get('/health', function(req, res) {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});