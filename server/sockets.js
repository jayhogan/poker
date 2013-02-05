/*global parent: true */

var parent = module.parent.exports,
    app = parent.app,
    server = parent.server,
    express = require('express'),
    sio = require('socket.io'),
    io = sio.listen(server),
    games = parent.games,
    Game = require('./game');


io.sockets.on('connection', function (socket) {

    socket.on('join game', function(data) {
        var game = games[data.game_id],
            playerIsDealer = false;

        if (!game) {
            game = games[data.game_id] = new Game(data.game_id, data.game_name);
            playerIsDealer = true;
        }
        
        var player = game.addPlayer(data.player_name, data.player_email, playerIsDealer);
        socket.set('player', player);

        socket.join(game.id);
        io.sockets.in(game.id).broadcast.emit('player joined', player);
    });
    
    socket.on('set current story', function() {
    
    });
});
