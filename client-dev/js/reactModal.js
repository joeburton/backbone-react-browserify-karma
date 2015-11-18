var React = require('react');
var $ = require('jquery');

var Modal = React.createClass({
    
    selectors: {
        processing: '[data-request-processing]',
        requestSuccess: '[data-request-success]',
        required: '[data-required]',
        modalContainer: '[data-modal-container]',
        modalOverlay: '[data-modal-overlay]',
        requestQuoteForm: '[data-request-quote]'
    },

    getInitialState: function() {
        return { isModalOpen: false };
    },

    valTypes: {

        standard: function ($field) {

            var eleValue = $field.find('input').val();
            
            if (eleValue === '') {
                $field.addClass('has-error');
            } else {
                $field.removeClass('has-error');
            }

        },

        email: function ($field) {
            
            var emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            
            var eleValue = $field.find('input').val();

            if (emailRegEx.test(eleValue) === false) {
                $field.addClass('has-error');
            } else {
                $field.removeClass('has-error');
            }

        }

    },

    sendForm: function (e) {

        e.preventDefault();

        var $form = $(this.selectors.requestQuoteForm),
            $required = $form.find(this.selectors.required),
            self = this;

        $.each($required, function(i, val) {
            
            var $field = $(val);
            var type = $field.data('required');

            self.valTypes[type]($field);

        });

        if ($form.find('.has-error').length) {
            return false;
        } else {
            this.processForm($form);
        }

    },

    processForm: function ($form) {

        var $processing = $(this.selectors.processing),
            $requestSuccess = $(this.selectors.requestSuccess),
            formData = $form.serialize();

        $form.addClass('hidden');
        $processing.removeClass('hidden');

        // mail send
        var subscribeRequest = $.ajax({
                type: 'GET',
                url: 'request-quote.php',
                data: formData
            });

        // success
        subscribeRequest.done(function(msg) {
            console.log('mail response: ', msg);
            $processing.addClass('hidden');
            $requestSuccess.removeClass('hidden');
        });

        // fail
        subscribeRequest.fail(function(jqXHR, textStatus) {
            
            $processing.addClass('hidden');
            $form.removeClass('hidden');

            if (jqXHR.status === 0) {
                alert('Not connect.n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.n' + jqXHR.responseText);
            }

        });

    },

    closeModal: function() {
        
        this.setState({ isModalOpen: false });
        
        if (!this.state.isModalOpen) {
            $(this.selectors.modalContainer).addClass('hidden');
            $(this.selectors.modalOverlay).addClass('hidden');
            $(this.selectors.requestQuoteForm).removeClass('hidden');
            $(this.selectors.processing).addClass('hidden');
            $(this.selectors.requestSuccess).addClass('hidden');
            $('.' + this.props.name).addClass('hidden');
            $(this.selectors.requestQuoteForm).trigger('reset');
        }

    },

    render: function() {
        return (
    	<div className={'modal ' + this.props.name + ' hidden'} data-modal-request-quote isOpen={this.state.isModalOpen}>
			<div className="modal-content">
                <a href="#" onClick={this.closeModal} className="close-modal">Close</a>
                <form className="quote-form" data-request-quote>
                    <div className="form-item">
                        <select name="type">
                            <option>Select project type</option>
                            <option value="Sewer Connections and Drainage repairs">Sewer Connections and Drainage repairs</option>
                            <option value="Clean and waste water diversions">Clean and waste water diversions</option>
                            <option value="Specialist groundworks">Specialist groundworks</option>
                            <option value="Highways and section 278">Highways and section 278</option>
                        </select>
                    </div>
                    <div className="form-item" data-required="standard">
                        <input type="text" name="name" placeholder="Your Name *" />
                    </div>
                    <div className="form-item">
                        <input type="text" name="company" placeholder="Company" />
                    </div>
                    <div className="form-item" data-required="email">
                        <input type="text" name="email" placeholder="Your Email *" />
                    </div>
                    <div className="form-item" data-required="standard">
                        <input type="text" name="phone" placeholder="Your Phone Number *" />
                    </div>
                    <div className="form-item">
                        <textarea name="enquiry" placeholder="Message"></textarea>
                    </div>
                    <button onClick={this.sendForm} className="send">SEND REQUEST</button>
                </form>
                <div className="request-processing hidden" data-request-processing></div>
                <div className="request-success hidden" data-request-success>
                    <div className="thankyou">Thank you!</div>
                    <p>The right person will be in touch shortly.</p>
                </div>
			</div>
		</div>
        );
    }
});

module.exports = Modal;

