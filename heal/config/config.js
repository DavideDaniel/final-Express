var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require( 'method-override' );

module.exports = function( app, express ){

	app.use(cors());
	app.set('views', './app/views');
	app.use(express.static('./app/public'));
	app.use( bodyParser.json( {
	extended: false
	} ) );
	app.use( methodOverride( '_method' ) );

};


// 	app.use( session( {
// 	secret: 'peachNinjas'
// } ) );
// app.use( cookieParser() );

