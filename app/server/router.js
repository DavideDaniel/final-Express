var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "app.db" );
var bcrypt = require( "bcrypt" );

module.exports = function ( app ) {

	//login get request
	app.get( '/' ), function ( request, response ) {
		console.log( "serving index.html" );
		response.send( __dirname + '/index.html' );
	}
	//login post request
	app.post( '/' ), function ( request, response ) {

	}

	//authenticated user home page
	app.get( '/home' ), function ( request, response ) {

	}
	//authenticated user editing post request
	app.post( '/home' ), function ( request, response ) {

	}

	//registering new admin(doctor)
	app.get( '/signup' ), function ( request, response ) {

	}
	//registering new admin(doctor) post request
	app.post( '/signup' ), function ( request, response ) {

	}

	app.get( '/', function ( request, response) {

	} );

	app.post( '/session', function ( request, response) {
		var username = request.body.username;
		console.log( username );
		var password = request.body.password;

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
						request.session.valid_user = true;
						response.redirect( '/admin' );
					}
					else {
						console.log( 'no' );
						response.redirect( '/' );
					}
				}
				else {
					console.log( 'no' );
					response.redirect( '/' );
				}
			} );
	} );

	app.get( '/admin', function ( request, response) {
		if ( request.session.valid_user ) {
			console.log( "serving admin.html" );
			response.send( __dirname + '/admin.html' );
		}
		else {
			response.redirect( '/' )
		}

	} );

	app.post( '/user', function ( request, response) {
		var username = request.body.username;
		var password = request.body.password;
		var hash = bcrypt.hashSync( password, 10 );
		db.run( "INSERT INTO users (username,password) VALUES (?,?)",
			username, hash, function ( err ) {
				if ( err ) {
					throw err;
				}
				response.redirect( '/' );
			} );
	} );

	//CRUD routes for patients - admin side
	//GET all patients
	app.get( '/patients', function ( request, response ) {
		db.all( "SELECT * FROM patients", function ( err, rows ) {
			if ( err ) {
				throw err;
			}
			response.json( rows );
		} );
	} );
	//POST to all patients
	app.post( '/patients', function ( request, response ) {
		var name = request.body.name;
		var sex = request.body.sex;
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
				response.json( row );
			} )
		} );
	} );
	//DELETE a patient with :id
	app.delete( '/patient/:id', function ( request, response ) {
		var id = request.params.id;

		db.run( "DELETE FROM patients WHERE id = ?", id,
			function ( err ) {
				if ( err ) {
					throw err
				}
				response.json( {
					deleted: true
				} )
			} );
	} );
	//UPDATE a patiend with :id
	app.put( "/patient/:id", function ( request, response ) {
		var id = request.params.id;
		var name = request.body.name;
		var sex = request.body.sex;

		db.run( "UPDATE patients SET name = ?, sex = ? WHERE id = ?", name, sex, id,
			function ( err ) {
				if ( err ) {
					throw err;
				}
				db.get( "SELECT * FROM patients WHERE id = ?", id, function ( err, row ) {
					if ( err ) {
						throw err;
					}
					response.json( row );
				} );
			} );
	} );

}