/* START.JS
	- starts the node.js server that will run
	on localhost:3000
*/
var express = require('express'),
	app		= express();

app.get('/', function (req,res){
	res.sendFile(__dirname + '/index.html');
});

// NODE REQUIRES US TO DETERMINE WHICH FILES WILL BE HOSTED
app.use('/js', express.static(__dirname + '/js/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/data', express.static(__dirname + '/data/'));

app.listen(3000, function(){
	console.log("Listening on port 3000...");
	console.log("Hit CTRL+C to QUIT");
});


   
  