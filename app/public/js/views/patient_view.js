$( document )
	.ready( function () {
		var PatientsView = Backbone.View.extend( {
			el: '#patientsList',
			initialize: function () {
				this.listenTo( this.collection, 'sync remove', this.render );
			},

			render: function () {
				var el = this.$el;
				el.html( '' );
				this.collection.each( function ( patient ) {
					el.append( new PatientView( {
							model: patient
						} )
						.render()
						.el );
				} )
				return this;
			}
		} );

		var PatientView = Backbone.View.extend( {
			tagName: 'li',
			template: _.template( $( '#patientTemplate' )
				.html() ),

			events: {
				'click .deleteButton': 'deletePatient',
				'click .editButton': 'editPatient',
				'click .updateButton': 'updatePatient'
			},

			editPatient: function() {
				this.$('.patient').hide();
				this.$('.editForm').show();
			},

			updatePatient: function() {
				var newName = this.$('#newName' + this.model.id).val();
				var newSex = this.$('#newSex' + this.model.id).val();
				this.model.set({name: newName, sex: newSex});
				this.model.save;
			},

			deletePatient: function () {
				this.model.destroy();
			},

			render: function () {
				this.$el.html( _.template( this.template( {
						patient: this.model.toJSON()
					} ) )

				)
				return this
			}
		} );

		var CreatePatientView = Backbone.View.extend( {
			el: '#addPatientForm',
			events: {
				'click #addNewPatient': 'createPatient'
			},
			createPatient: function () {
				var nameField = this.$( '#newPatientName' );
				var sexField = this.$( '#newPatientSex' );
				var newPatientName = nameField.val();
				var newPatientSex = sexField.val();

				this.collection.create( {
					name: newPatientName,
					sex: newPatientSex
				} );

				nameField.val( '' );
				sexField.val( '' );
			}

		} );

		var createPatientView = new CreatePatientView( {
			collection: patients
		} );
		var patientsView = new PatientsView( {
			collection: patients
		} );

	} )