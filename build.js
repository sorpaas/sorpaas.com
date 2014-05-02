// Load Metalsmith
var Metalsmith = require('metalsmith');

// Load plugins
var drafts = require('metalsmith-drafts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var metadata = require('metalsmith-metadata');
var assets = require('metalsmith-static');
var watch = require('metalsmith-watch');

var domain = require('./plugins/github-pages-domain');

var m = Metalsmith(__dirname);

m.use(function(files, metalsmith, done) {
  var sys = require('sys')
  var exec = require('child_process').exec;
  exec("make clean", function(error, stdout, stderr) {
    sys.puts(stdout);
    done();
  });
});

if(process.argv[2] == "--watch") {
  var directories = ['src', 'templates', 'assets'];
  m.use(watch({
    pattern : directories.map(function(dir) { return '../' + [dir] + '/**/*' }),
    livereload: false
  }));
}

m.metadata({
  title: "sorpa'as",
  description: "sorpa'as personal website"
})

m.use(drafts())
m.use(markdown())
m.use(permalinks(':permalink'))
m.use(templates('ejs'))
m.use(assets({
  src: "assets",
  dest: "assets"
}));
m.use(domain('sorpaas.com'))

m.build(function(err){
  if (err) throw err;
});
