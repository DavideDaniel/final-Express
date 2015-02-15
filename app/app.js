var express = require( 'express' );
var cors = require( 'cors' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );

var session = require( 'express-session' );
var request = require( 'request' );
var app = express();

var trelloKey = process.env.TRELLO_KEY;

app.use( bodyParser.json( {
	extended: false
} ) );
// app.use( cookieParser() );
app.use( session( {
	secret: 'peachNinjas'
} ) );
app.use( cors() );
app.use( methodOverride( '_method' ) );
app.use( express.static( __dirname + '/public' ) );

require( './server/router.js' )( app );

app.listen( 3000 );

console.log( "server listening on port: 3000" );