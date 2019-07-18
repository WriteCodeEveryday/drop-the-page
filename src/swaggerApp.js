const express = require('express');
const YAML = require('yamljs');
const SwaggerParser = require('swagger-parser');
const swaggerUi = require('swagger-ui-express');
const { connector }  = require('swagger-routes-express');
const morgan = require('morgan');
const routes = require('./routes');
const swaggerDocument = YAML.load('./drop-the-page.yml');

const swaggerApp = async () => {
  const parser = new SwaggerParser();
  const description = await parser.validate('drop-the-page.yml');
  const connect = connector(routes, description);
  const app = express();
  app.use(morgan('combined'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  connect(app);
  return app
}
module.exports = swaggerApp