(function() {

    'use strict';
    
    var AddressBookView  = require('./AddressBookView');
    var AddressCollection  = require('./AddressCollection');
    
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Modal = require('./reactModal');

    var addressCollection = new AddressCollection([{ 
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

    var addresses = new AddressBookView({collection: addressCollection});

    ReactDOM.render(<Modal name="modal-request-quote" />, document.querySelector('.modals'));

})();