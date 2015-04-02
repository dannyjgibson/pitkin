var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    config = require('./config'),
    superagent = require('superagent'),
    io = require('socket.io')(http);

// read/write chatroom data to db
mongoose.connect(config.database.test);
console.log('connected to mongodb at ' + config.database.test);

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

var setupNamespace = function () {
  var namespaceId = generateNamespaceId(),
      namespace = socket.of(namespaceId);
      namespace.on('connection', function (socket) {
        console.log('someone connected to ' + namespaceId);
      });
  superagent.post('http://localhost:3000/api/chatrooms')
    .send({
      namespaceId: namespace
    })
    .end(function(res) {
      // chatroom added to db. Maybe store mongodb id? 
    });
};

var generateNamespaceId = function () {
  var id = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};
