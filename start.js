// https://www.youtube.com/watch?v=ErfEKTrgq5Y
// var csv = require('fast-csv');
// var fs = require('fs');


// fs.createReadStream("data/challenge_data.csv")
// 	.pipe(csv())
// 	.on('data', function(data){
		
// 	})
// 	.on('end', function(){
// 		console.log('Read finished');
// 	});
 


var express = require('express'),
	app		= express();

app.get('/', function (req,res){
	res.sendFile(__dirname + '/index.html');
});


app.use('/js', express.static(__dirname + '/js/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/data', express.static(__dirname + '/data/'));

app.listen(3000, function(){
	console.log("Listening...");
});


   
  