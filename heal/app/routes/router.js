
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "app.db" );
var bcrypt = require( "bcrypt" );

module.exports = function ( app, express ) {

	//login get request
	app.get( '/' ),
	function ( req, res ) {
		console.log( "serving index.html" );
		res.send( __dirname + '/index.html' );
	}
	//login post request
	app.post( '/' ),
	function ( req, res ) {

	}

	//authenticated user home page
	app.get( '/home' ),
	function ( req, res ) {

	}
	//authenticated user editing post request
	app.post( '/home' ),
	function ( req, res ) {

	}

	//registering new admin(doctor)
	app.get( '/signup' ),
	function ( req, res ) {

	}
	//registering new admin(doctor) post request
	app.post( '/signup' ),
	function ( req, res ) {

	}
	// get all patients via doc view
	app.get( '/provider', function ( req, res ) {

		console.log( "serving provider.html" );
		res.render('provider.ejs' );
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
						res.redirect( '/admin' );
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

	app.get( '/admin', function ( req, res ) {
		if ( req.session.valid_user ) {
			console.log( "serving admin.ejs" );
			res.send( __dirname + '/admin.ejs' );
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
	//GET all patients
	app.get( '/patients', function ( req, res ) {
		db.all( "SELECT * FROM patients", function ( err, rows ) {
			if ( err ) {
				throw err;
			}
			res.json( rows );
		} );
	} );
	//POST to all patients
	app.post( '/patients', function ( req, res ) {
		var name = req.body.name;
		var sex = req.body.sex;
		console.log( name + 'is :' + sex );
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
	//DELETE a patient with :id
	app.delete( '/patient/:id', function ( req, res ) {
		var id = req.params.id;

		db.run( "DELETE FROM patients WHERE id = ?", id,
			function ( err ) {
				if ( err ) {
					throw err
				}
				res.json( {
					deleted: true
				} )
			} );
	} );
	//UPDATE a patiend with :id
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

}