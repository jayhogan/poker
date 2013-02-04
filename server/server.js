var express = require('express')
  , app = express();

// Global environment settings
process.env.PORT = 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configure Express
app.configure(function() {
    app.set('port', process.env.PORT);
    app.set('env', process.env.NODE_ENV);
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    console.log('Express booting in %s mode', app.get('env'));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
  app.use(express.logger()); 
});

exports.app = app;

exports.games = {};

// Configure routes
require('./routes');

// Start HTTP Server
exports.server = require('http')
    .createServer(app)
    .listen(app.get('port'), function() {
    console.log('Planning Poker server started on port %d', app.get('port'));
});

// Start socket server
require('./sockets');
