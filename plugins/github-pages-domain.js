module.exports = plugin;

function plugin(domain) {
  return function(files, metalsmith, done) {
    files["CNAME"] = {};
    files["CNAME"].contents = new Buffer(domain)
    done();
  }
}