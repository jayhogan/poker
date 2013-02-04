/*
 * Express routes
 */
var app = module.parent.exports.app;

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

