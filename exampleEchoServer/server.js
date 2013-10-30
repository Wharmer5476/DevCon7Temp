var net = require('net')

var server = net.createServer(function(socket) {
    socket.write('Hello World!\n');
    socket.end();
});

server.listen(process.env.PORT);

console.log('Port: ' + process.env.PORT + " IP: " + process.env.IP)