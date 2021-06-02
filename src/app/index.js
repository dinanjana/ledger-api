const express = require('express');
const { controllers } = require('../controller');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleware');

const registerHandlers = (app) => {
    controllers.forEach(
      (controller) => {
        app[controller.method](
          controller.path, controller.handlers,
        );
      },
    );
  };

const init = () => {
  const app = express()
  registerHandlers(app);
  app.use(ErrorMiddleware);
  return app;
};  

const start = (app) => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Ledeger service listening at http://localhost:${port}`);
    });
}

module.exports = {
    init,
    start
};