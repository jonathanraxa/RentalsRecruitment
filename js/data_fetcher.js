/* DATA FETCHER 
	- namespace that allows us to retrieve and set the 
	standard data values we want to use to calculate
	the algorithm 
*/

var price 		= [];
var bathrooms   = [];
var bedrooms 	= [];
var square_ft 	= [];

// The median values of each category
var price_standard;
var bathrooms_standard;
var bedrooms_standard;
var square_ft_standard;

// FETCHES ALL DATA
var data_fetcher = {
	fetch_csv_file: function () {
		$.ajax({
		    type: "GET",
		    url: "/data/challenge_data.csv",
		    data: {},
		    success: function(data){
		    	data_fetcher.parse_file(data);
	  		}
		})
	},

	parse_file: function(fileContent){
		// handles the uploaded CSV file

	    //var file = evt.target.files[0];
	    Papa.parse(fileContent, {
	      header: true,
	      dynamicTyping: true,
	      complete: function(data) {
	                
	        // console.log(data); 
	        var data_size = data.data.length;
	        var i;
	        for(i = 0; i < data_size; i++){
	        	price[i] 	 = data.data[i].price;
	        	bathrooms[i] = data.data[i].bathrooms;
	        	bedrooms[i]  = data.data[i].bedrooms;
	        	square_ft[i] = data.data[i]['square-foot'];
	        }
	        data_fetcher.get_price_standard();
	        data_fetcher.set_price_standard();
	        displayPropertyPrice();
	      
	    		}
	  		}) // end Papa.parse
	},

	get_median: function (values) {
		/* Didn't want to reinvent the wheel!
		CODE Snippet taken from: https://gist.github.com/caseyjustus/1166258 
		*/
		values.sort( function(a,b) {return a - b;} );
		var half = Math.floor(values.length/2);
		if(values.length % 2)
			return values[half];
		else
			return (values[half-1] + values[half]) / 2.0;
	},

	get_price_standard: function () {

	// Determines the price of a home given user inputs
	// http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_form_elements_index
	// SORTS THE ARRAY AND GETS THE MEDIAN

	  	 price.sort(function(a, b){return a-b});
	  	 bathrooms.sort(function(a, b){return a-b});
	  	 bedrooms.sort(function(a, b){return a-b});
	  	 square_ft.sort(function(a, b){return a-b});

	  	 // set the standards!
	  	 price_standard     = data_fetcher.get_median(price);
	  	 bedrooms_standard  = data_fetcher.get_median(bedrooms);
	  	 bathroom_standard  = data_fetcher.get_median(bathrooms);
	  	 square_ft_standard = data_fetcher.get_median(square_ft);
	  	 
	  	 return [price_standard, bedrooms_standard,bathroom_standard,square_ft_standard];
	},

	set_price_standard: function () {
		var data =   data_fetcher.get_price_standard();
		price_standard     = data[0];
		bedrooms_standard  = data[1];
		bathroom_standard  = data[2];
		square_ft_standard = data[3];

		 calculations.price_ratio(parseInt(bedrooms_standard), 
	  	 							parseInt(bathroom_standard),
	  	 							parseInt(square_ft_standard),
	  	 							parseInt(price_standard));
		//calculations.price_ratio(bedrooms_standard,bathroom_standard,square_ft_standard,price_standard);
	},



}

