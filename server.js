var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app).listen(process.env.PORT);
var io = require('socket.io').listen(server);

console.log(process.env.PORT);
console.log(process.env.IP)

io.set('log level', 2); // reduce logging

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var buffer = [];
io.sockets.on('connection', function(client){

    var clientId = client.id;
    clientId = 'User'+clientId.substr(clientId.length-3,3);

    client.broadcast.emit('connect',clientId + ' connected');
    client.emit('message',{'messages':buffer});

    client.on('message', function(message){
    	console.log(message);

        var msg = { user: clientId, message: message};
        buffer.push(msg);
        if (buffer.length > 15)
        	buffer.shift();
        client.broadcast.emit('message',{'messages':[msg]});
    });

    client.on('disconnect', function(){
        client.broadcast.emit('disconnect',clientId + ' disconnected');
    });
});