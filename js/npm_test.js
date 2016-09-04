// READS THE CHALLENGE DATA FILE
var fs = require("fs");
fs.readFile("../data/challenge_data.csv", "UTF-8", function (err, contents) {
	if (err){
		console.log(err);
	}
	console.log(contents);
});

