var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var AddressModel = Backbone.Model.extend({
	
	defaults: { 
		house: 'House Name',
    	address1: 'Street',
		address2: 'City',
    	postcode: 'Postcode'
	}
	
});

module.exports = AddressModel;