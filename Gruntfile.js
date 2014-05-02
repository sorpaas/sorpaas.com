module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['src/**/*', 'templates/**/*', 'assets/**/*'],
      tasks: ['build']
    },
    shell: {
      build: {
        command: 'make build'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  
  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['shell']);

};