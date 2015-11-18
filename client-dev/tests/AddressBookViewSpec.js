/* jslint node: true */
/* global describe, it, expect */

"use strict";

var AddressModel = require('../js/AddressModel.js');
var AddressBookView = require('../js/AddressBookView.js');
var AddressCollection = require('../js/AddressCollection.js');

var $ = require('jquery');

describe("#AddressModel", function () {

	var addressModel = new AddressModel();

	it("The AddressModel should have the house property", function () {
		expect(addressModel.get('house')).toBe('House Name');
	});
	
});

describe("#AddressModel 2", function () {

	var addressModel = new AddressModel();

	it("The AddressModel should have the house property 2", function () {
		expect(addressModel.get('house')).toBe('House Name');
	});
	
});

describe("#AddressBookView", function () {

	var addressCollection;
	var addressBookView;
	
	beforeEach(function () {
	    
	    addressCollection = new AddressCollection([{ 
	            house: 'Flat 11 De La Warr Court',
	            address1: '21 Church Avenue',
	            address2: 'London',
	            postcode: 'E4 9QY'
	        },{ 
	            house: 'Churchgates',
	            address1: 'The Street',
	            address2: 'Lyng',
	            postcode: 'NR9 5AL'
	        }]);

	    addressBookView = new AddressBookView({collection: addressCollection});

	    addressBookView.$el = $('<div class="address-container"><a href="#" class="add-address">Add Address</a><a href="#" class="number-addresses">Number Address <span class="num"></span></a><ul class="addresses"></ul></div>');

	    addressBookView.getNumberOfAddresses();

	});

	it("should return the number of addresses getNumberOfAddresses", function () {
		expect(addressBookView.getNumberOfAddresses()).toBe(2);
	});

	it("should contain the number of addresses listed", function () {
		expect(addressBookView.$el.find('.num').html()).toBe('(2)');
	});

});
