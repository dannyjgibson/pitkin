var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    io = require('socket.io')(http);

http.listen(3000, function () {
    console.log('listening on *:3000');
});

app.use(express.static(__dirname, '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
    console.log('connected');
    socket.on('chat message', function (msg){
        io.emit('chat message', msg);
    });
});

function generateRoomId(IdLength) {
    var text = [],
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < IdLength; i++) {
        text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text.join([separator='']);
}
