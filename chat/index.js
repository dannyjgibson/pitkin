var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
