const sass = require('node-sass');

module.exports = function (grunt) {
  'use strict';
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= props.license %> */\n',
    // Task configuration

    sass: {
      options: {
        implementation: sass,
        sourceMap: false,
        outputStyle: 'expanded',
      },
      dist: {
        files: [{
            expand: true,
            flatten: true,
            cwd: "surongstyle/",
            src: '**/*.scss',
            dest: 'dist/',
            ext: '.css',
          },

        ],
      },
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer'),
          require('postcss-prefixer')({
            prefix: 'sr-'
          }),
        ]
      },
      dist: {
        src: 'dist/**/*.css'
      }
    },
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task
  grunt.registerTask('default', ['sass', 'postcss']);
};
