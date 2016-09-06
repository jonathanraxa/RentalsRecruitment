/* CALCULATIONS 
	- computes algorithm given the set standard given
	to us via the data_fetcher 
*/
var calculations = {

  	// CALCULATES PRICES FOR PROPERTIES
  	price_calculation: function (bed,bath,sq){

	  	if (bed === 1) {
	  		var bedroom_price = .96*(.4)*(sq);
	  	} else {
	  		var bedroom_price = 1.92*(.4)*(sq);
	  	}

	  	var bathroom_price = (bath)*2.00*(0.05)*(sq);
	  	var price_per_sqft = 1.86*(.55)*(sq);
		var determined_price = (bedroom_price + bathroom_price + price_per_sqft).toFixed();

	  	return determined_price;
  	}
}
