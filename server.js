const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const { config } = require('./config/index');
const ipsApi = require('./routes/ips');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

const swaggerDoc = require('./swagger.json');
// routes
ipsApi(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
