const superagent = require('superagent'),
	Q = require('q');

module.exports = function(app) {

app.get("/jsonp/:functionName", (req, res) => {
    jsonp()
    .then(data => {res.send(req.params.functionName+"({text: '"+data+"'})"); return; })
    .catch(data => {res.status(500); res.json(data);});
  });

};

function jsonp() {
	let def = Q.defer();
  superagent.get("http://alegria.live/lorem1.txt")
  .end((err, res) => {
    if(err) {def.reject(err); return;}
  	def.resolve(res.text);
  });

  return def.promise;
}