var http = require('http');
var visits = 0;

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write("Number of visits so far: " + visits++);
	response.end();
}).listen(process.env.PORT);

console.log('Server started');