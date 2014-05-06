
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/collab_service_test.js']
            }
        }
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('default', 'mochaTest');

};
