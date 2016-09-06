/* CALCULATIONS 
	- computes algorithm given the set standard given
	to us via the data_fetcher 
*/

var calculations = {
	ratio_standard: function (bed,bath,sq) {
		// DETERMINES SET RATIO TO USE FOR ALGORITHM
		return  sq/[bed + bath];
  	},

  	price_calculation: function (price,bed,bath,sq,otherProp){
  		console.log("bed: " + bed);
  		console.log("bath: " + bath);
  		console.log("sq: " + sq);
	  	if (bed === 1){
	  		var bedroom_price = 1.92*(.2)*(sq);
	  	} else {
	  		var bedroom_price = 1.92*(.4)*(sq);
	  	}

	  	var bathroom_price = (bath)*2.00*(0.05)*(sq);

	  	var price_per_sqft = 1.86*(.55)*(sq);

	  	console.log(bedroom_price);
		console.log(bathroom_price);
		console.log(price_per_sqft);

		var determined_price = (bedroom_price + bathroom_price + price_per_sqft).toFixed();

		//console.log("TOTAL: " + total);
	  	//var determined_price = bed*[[1.92*(sq)]/5] + bath*[[2.00*(sq)]/20] + [[[1.90]*3*(sq)]/4];
	  	// calculate ratio b*x = a*c
	  	//var determined_price = [price*otherProp]/bed_bath_sq_total;

	  	return determined_price;
  	}

}

// 2[[1.92(1250)]/5] + 2[[2.00(1250)]/20] + [[[1.90]*3*(1250)]/4]