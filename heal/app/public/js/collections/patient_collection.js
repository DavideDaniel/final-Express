console.log("collections");

var PatientsCollection = Backbone.Collection.extend( {
	model: Patient,
	url: 'http://localhost:3000/patients/'
} );

var patients = new PatientsCollection();

patients.fetch();
console.log(patients);