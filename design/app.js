'use strict';

var SwaggerExpress = require('swagger-express-mw');
// var app = require('express')();

var express = require('express');
var app = express();
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // Use Swagger UI in this app
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  // app.use('/static', express.static('static'));
  // app.use('/school', express.static('app/dist'));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 5000;
  // app.listen(port);

  app.listen(port, '0.0.0.0');



  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
