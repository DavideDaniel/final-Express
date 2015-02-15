
console.log("patient");
var Patient = Backbone.Model.extend({
	defaults: {
		name: 'Esther',
		sex: 'female'
	},
	initialize: function(){
		console.log("Patient profile created");
		this.on('change', function(){
			console.log('something changed');
		});
		this.on("invalid", function(model, error){
			console.log(error);
		});
	},
	validate: function(attributes){
		if(attributes.name === undefined){
			return "no name entered";
		} if(attributes.sex === undefined){
			return "no sex entered";
		}
	},
});
