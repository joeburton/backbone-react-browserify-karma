/* jslint node: true */
/* global describe, it, expect */

"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');
var Modal = require('../js/reactModal.js');

describe("#reactModal", function () {

	beforeEach(function() {
		var $fixture = setFixtures('<div class="modal-overlay hidden" data-modal-overlay></div><div class="modals hidden" data-modal-container></div>');
		ReactDOM.render(<Modal name="modal-request-quote" />, document.querySelector('.modals'));
	});

	it("should be a react component", function () {
		expect(true).toBe(true);
	});
	
	it("should be a react component 2", function () {
		expect(true).toBe(true);
	});
	
});