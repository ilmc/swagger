const electron = require('electron');
const {app, BrowserWindow} = electron;

const url = require('url');
const path = require('path');

var SwaggerExpress = require('swagger-express-mw');
// var app = require('express')();

var express = require('express');
var eapp = express();
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

module.exports = eapp; // for testing

app.on('ready', () => {

	start_server();

	let win = new BrowserWindow({width: 800, height: 600});
	// §win.loadURL(url.format({
	// 	pathname: path.join(__dirname, 'index.html'),
	//	protocol: 'file:',
	//	slashes: true
	//}))

	$win.loadURL('http://127.0.0.1:5000/docs');
})


function start_server() {
  SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // Use Swagger UI in this eapp
  eapp.use(SwaggerUi(swaggerExpress.runner.swagger));
  // eapp.use('/static', express.static('static'));
  // eapp.use('/school', express.static('app/dist'));

  // install middleware
  swaggerExpress.register(eapp);

  var port = process.env.PORT || 5000;
  // app.listen(port);

  eapp.listen(port, '0.0.0.0');

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});



}
