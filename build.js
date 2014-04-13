// Load Metalsmith
var Metalsmith = require('metalsmith');

// Load plugins
var drafts = require('metalsmith-drafts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var metadata = require('metalsmith-metadata');
var domain = require('./plugins/github-pages-domain')

var m = Metalsmith(__dirname);

m.metadata({
  title: "sorpa'as",
  description: "sorpa'as personal website"
})

m.use(drafts())
m.use(markdown())
m.use(permalinks(':title'))
m.use(templates('ejs'))
m.use(domain('sorpaas.com'))

m.build(function(err){
  if (err) throw err;
});
