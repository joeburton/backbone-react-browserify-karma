var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var AddressModel  = require('./AddressModel');

var AddressCollection = Backbone.Collection.extend({
	model: AddressModel
});

module.exports = AddressCollection;