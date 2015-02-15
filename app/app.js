var express = require( 'express' );
var cors = require( 'cors' );
var fs = require( 'fs' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "app.db" );
var bcrypt = require( "bcrypt" );
var session = require( 'express-session' );
var app = express();

app.use( bodyParser.json( {
	extended: false
} ) );
app.use( cors() );

app.use( session( {
	secret: 'peachNinjas',
	resave: false,
	saveUninitialize: true
} ) );
app.use( methodOverride( '_method' ) )
app.use( express.static( __dirname + '/public' ) );

app.get( '/', function ( req, res ) {
	console.log("serving index.html");
	res.sendfile( __dirname + '/index.html' );
} );

app.post( '/session', function ( req, res ) {
	var username = req.body.username;
	console.log( username );
	var password = req.body.password;

	db.get( 'SELECT * FROM users WHERE username = ?',
		username, function ( err, row ) {
			if ( err ) {
				throw err;
			}
			console.log( row );
			if ( row ) {
				var passwordM = bcrypt.compareSync( password, row.password );
				if ( passwordM ) {
					console.log( 'hey' );
					req.session.valid_user = true;
					res.redirect( '/user_page' );
				}
				else {
					console.log( 'no' );
					res.redirect( '/' );
				}
			}
			else {
				console.log( 'no' );
				res.redirect( '/' );
			}
		} );
} );

app.get( '/user_page', function ( req, res ) {
	if ( req.session.valid_user ) {
		console.log("serving user_page.html");
		res.sendfile( __dirname + '/user_page.html' );
	}
	else {
		res.redirect( '/' )
	}

} );

app.post( '/user', function ( req, res ) {
	var username = req.body.username;
	var password = req.body.password;
	var hash = bcrypt.hashSync( password, 10 );
	db.run( "INSERT INTO users (username,password) VALUES (?,?)",
		username, hash, function ( err ) {
			if ( err ) {
				throw err;
			}
			res.redirect( '/' );
		} );
} );

//CRUD routes for patients - admin side
app.get( '/patients', function ( req, res ) {
  db.all( "SELECT * FROM patients", function ( err, rows ) {
    if ( err ) {
      throw err;
    }
    res.json( rows );
  } );
} );

app.post( '/patients', function ( req, res ) {
  var name = req.body.name;
  var sex = req.body.sex;
console.log(name + 'is :' + sex);
  db.run( "INSERT INTO patients (name, sex) VALUES (?,?)", name, sex, function (
    err ) {
    if ( err ) {
      throw err
    };
    var id = this.lastID;
    db.get( "SELECT * FROM patients WHERE id = ?", id, function ( err, row ) {
      if ( err ) {
        throw err
      };
      res.json( row );
    } )
  } );
} );

app.delete( '/patient/:id', function ( req, res ) {
  var id = req.params.id;

  db.run( "DELETE FROM patients WHERE id = ?", id,
    function ( err ) {
      if ( err ) {
        throw err
      }
      res.json({deleted : true})
    } );
} );

app.put( "/patient/:id", function ( req, res ) {
  var id = req.params.id;
  var name = req.body.name;
  var sex = req.body.sex;

  db.run( "UPDATE patients SET name = ?, sex = ? WHERE id = ?", name, sex, id,
    function ( err ) {
      if ( err ) {
        throw err;
      }
      db.get( "SELECT * FROM patients WHERE id = ?", id, function ( err, row ) {
        if ( err ) {
          throw err;
        }
        res.json( row );
      } );
    } );
} );

app.listen( 3000 );

console.log("server listening on port: 3000");