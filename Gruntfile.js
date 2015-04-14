module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            vendor: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/underscore/underscore-min.js',
                    'node_modules/backbone/backbone-min.js',
                    'node_modules/backbone.localstorage/backbone.localstorage-min.js',
                    'node_modules/react/dist/react.min.js',
                    'node_modules/react/dist/JSXTransformer.js'
                ],
                dest: 'vendor.js'
            },
            app: {
                src: [
                    'app/app.js',
                    'app/contact/contactView.js',
                    'app/contacts/contactsView.js',
                    'app/contacts/searchView.js',
                    'app/contacts/tableItemsView.js',
                    'app/contacts/itemView.js',
                    'app/contacts/model.js',
                    'app/routs.js'
                ],
                dest: 'main.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat']);

};
