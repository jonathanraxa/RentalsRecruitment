
var csv = "../challenge_data.csv"
// Parse CSV string
var data = Papa.parse(csv);

// Parse local CSV file
Papa.parse(file, {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});
