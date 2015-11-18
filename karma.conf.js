module.exports = function(karma) {
    karma.set({

        frameworks: ['browserify', 'jasmine-jquery', 'jasmine'],

        files: ['client-dev/tests/*.js'],

        preprocessors: {
            'client-dev/tests/*.js': ['browserify']
        },

        browsers: ['Chrome'],

        reporters: ['spec', 'failed', 'html'],

        browserify: {
            transform: ['reactify'],
            debug: false,
            bundleDelay: 1000
        },

        autoWatch: true,

        client: {
            captureConsole: false
        }

    });

}