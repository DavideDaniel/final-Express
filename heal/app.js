var express = require( 'express' );
var session = require( 'express-session' );
var request = require( 'request' );
var app = express();
var config = require('./config/config.js');
var app = express();

config(app, express);
require('./app/routes/router.js')(app);

var trelloKey = process.env.TRELLO_KEY;

app.listen(3000);
console.log( "server listening on port: 3000" );
