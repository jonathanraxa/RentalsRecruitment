/* CALCULATIONS 
	- computes algorithm given the set standard given
	to us via the data_fetcher 
*/

var br_std_price;
var ba_std_price;
var sq_std_price;

var calculations = {

	// CALCULATIONS THE STANDARDS TO USE FROM OUR MEDIANS
	// UNFORTUNATELY THIS IS UNFINISHED
	// TODO: FINSH ALGORITHM
	price_ratio: function (std_bed, std_bath, std_sq, std_price) {


		// PROPORTIONS BASED ON CHOICE MADE ON AVERAGE BR/BA TO SQ-FT RATIO
		var bed = (8/20)*(std_sq); // 2(.4)(1000)
		var bath = (1/20)*(std_sq); // 1(.05)(1000)
		var square_feet = (11/20)*(std_sq); // (.55)(1000)

		var price_ratio = Math.round(std_price)/std_sq; //1.892
		
		// BEDROOMS WILL BE THE SET PRICE RATIO PLUS .02
		br_std_price = (price_ratio) + (.02);
		var bedroom_price_temp  = (price_ratio+(.02))*bed;

		// PRICE PER SQ-FT
		var sq_ft_price = square_feet*price_ratio;

		// BATHROOMS ARE INEVITABLY GOING TO COST LESS IN THIS CASE
		var bathroom_price_temp = Math.round(std_price) - ((bedroom_price_temp + sq_ft_price));
		
		ba_std_price = bathroom_price_temp / bath;
		sq_ft_price = price_ratio;

	},

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
