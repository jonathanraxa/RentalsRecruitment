var http = require("http");
const path = require('path');
path.basename('./index.html');

var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});

	res.end(path);


});

server.listen(3000);

console.log("Server listening on port 3000");