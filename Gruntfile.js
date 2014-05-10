var process = require('child_process');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          livereload: true,
          base: './build'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      files: ['src/**/*', 'templates/**/*', 'assets/**/*'],
      tasks: ['build']
    },
    shell: {
      clean: {
        command: './clean.sh'
      },
      build: {
        command: 'node ./build'
      },
      deploy: {
        command: 'cd ./build && git add --all && git commit -m "deploy site $(date +%s)" && git push origin gh-pages'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  
  // Default task(s).
  grunt.registerTask('build', ['shell:build']);
  grunt.registerTask('clean', ['shell:clean']);
  grunt.registerTask('deploy', ['clean', 'build', 'shell:deploy']);
  grunt.registerTask('serve', ['clean', 'build', 'connect', 'watch']);
  grunt.registerTask('default', ['serve']);
};