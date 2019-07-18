require('dotenv').config();
const swaggerApp = require('./swaggerApp');
swaggerApp().then(app => app.listen(process.env.PORT))
  .then(() => {
    console.debug(`Server started, port: ${process.env.PORT}`);
  })
  .catch(err => {
    console.error('caught error', err);
  })