
$(document).ready(function(){

$.ajax({
    type: "GET",
    url: "/data/challenge_data.csv",
    data: {},
    success: function(data){
      handleFileSelect(data); 
    }
  });

 $("#csv-file").change(handleFileSelect);


    $('#propertyForm')
        // Add button click handler
        .on('click', '.addButton', function() {
            propertyIndex++;
            var $template = $('#bookTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-book-index', propertyIndex)
                                .insertBefore($template);

            // Update the name attributes
            $clone
                .find('[name="name"]').attr('name', 'property[' + propertyIndex + '].name').end()
                .find('[name="bedrooms"]').attr('name', 'property[' + propertyIndex + '].bedrooms').end()
                .find('[name="bathrooms"]').attr('name', 'property[' + propertyIndex + '].bathrooms').end()
                .find('[name="squarefeet"]').attr('name', 'property[' + propertyIndex + '].squarefeet').end();


            // Add new fields
            // Note that we also pass the validator rules for new field as the third parameter
            $('#propertyForm')
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-book-index');

            // Remove fields
            $('#propertyForm')

            // Remove element containing the fields
            $row.remove();
        });
});


  var data;
  var price = [];
  var bathrooms = [];
  var bedrooms = [];
  var square_ft = [];

  // The median values of each category
  var price_standard;
  var bathrooms_standard;
  var bedrooms_standard;
  var square_ft_standard;
 
  var propertyIndex = 0;


  // handles the uploaded CSV file
  // TODO: Find a way to keep the file on the server instead 
  // 	   without having to upload it!
  function handleFileSelect(fileContent) {
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
        setStandard();
        displayPropertyPrice();
      }
    });
  }


// populates the results div tag
function populate(){
	for(i = 0; i <= propertyIndex; i++){
		writeResults(i);
	}
}

// appends all the results from given arguments
function writeResults(index){

$("#results").append("<p style='font-size:xx-large'><span class='user_results' style='font-size: 45px;' id='property["+index+"].name'></span> with <span class='user_results' id='property["+index+"].bedrooms'></span> bedroom(s) & <span class='user_results' id='property["+index+"].bathrooms'></span> bathroom(s) at <span class='user_results' id='property["+index+"].squarefeet'></span>sq-ft is valued at: <br><span class='user_results' style='font-size: 45px;' id='property["+index+"].price'></span>(USD)</p>");


		var a = document.getElementById("propertyForm").elements.namedItem("property["+index+"].name").value;
		document.getElementById("property["+index+"].name").innerHTML = a;

		var b = document.getElementById("propertyForm").elements.namedItem("property["+index+"].bedrooms").value;
		document.getElementById("property["+index+"].bedrooms").innerHTML = b;

		var c = document.getElementById("propertyForm").elements.namedItem("property["+index+"].bathrooms").value;
		document.getElementById("property["+index+"].bathrooms").innerHTML = c;

		var d = document.getElementById("propertyForm").elements.namedItem("property["+index+"].squarefeet").value;
	    document.getElementById("property["+index+"].squarefeet").innerHTML = d;

		console.log("PRICE: " 	    + price_standard);
		console.log("BEDROOMS: "    + bedrooms_standard);
		console.log("BATHROOMS: "   + bathroom_standard);
		console.log("SQUARE-FOOT: " + square_ft_standard);	   

		var userPropNoPrice = propertyBedBathPerSqCalc(parseInt(b),parseInt(c),parseInt(d));

		console.log(userPropNoPrice);

		var userPropWithPrice = propertyPriceCalculation(price_standard,
													  bedrooms_standard,
													  bathroom_standard, 
													  square_ft_standard,
													  userPropNoPrice);

		document.getElementById("property["+index+"].price").innerHTML = '$' + Math.round(userPropWithPrice) + " ";


  }

	// Determines the price of a home given user inputs
	// http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_form_elements_index
	// SORTS THE ARRAY AND GETS THE MEDIAN
	function getStandard(){

	  	 price.sort(function(a, b){return a-b});
	  	 bathrooms.sort(function(a, b){return a-b});
	  	 bedrooms.sort(function(a, b){return a-b});
	  	 square_ft.sort(function(a, b){return a-b});

	  	 // set the standards!
	  	 price_standard     = median(price);
	  	 bedrooms_standard  = median(bedrooms);
	  	 bathroom_standard  = median(bathrooms);
	  	 square_ft_standard = median(square_ft);

	  	 return [price_standard, bedrooms_standard,bathroom_standard,square_ft_standard];

	}

	// TAKES THE DATA AND SETS A STANDARD FOR THE ALGORITHM TO USE
	function setStandard(){
		var data = getStandard();
		price_standard = data[0];
		bedrooms_standard = data[1];
		bathroom_standard = data[2];
		square_ft_standard = data[3];
	}

  // DISPLAY GIVEN ARGUMENT VALUES
  function displayPropertyPrice(){

  	 var propertyValNoPrice1 = propertyBedBathPerSqCalc(2,2,1250);
  	 var property_price1 = propertyPriceCalculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice1);
  	 $( "#price1" ).append("$" + Math.round(property_price1) );


  	 var propertyValNoPrice2 = propertyBedBathPerSqCalc(1,1,750);
  	 var property_price2 = propertyPriceCalculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice2);
  	 $( "#price2" ).append("$" + Math.round(property_price2) );

  	 
 	 var propertyValNoPrice3 = propertyBedBathPerSqCalc(3,1,1500);
  	 var property_price3 = propertyPriceCalculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice3);
  	 $( "#price3" ).append("$" + Math.round(property_price3) );

 	 var propertyValNoPrice4 = propertyBedBathPerSqCalc(4,2,2250);
  	 var property_price4 = propertyPriceCalculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice4);
  	 $( "#price4" ).append("$" + Math.round(property_price4) );



  };

  // DETERMINES SET RATIO TO USE FOR ALGORITHM
  function propertyBedBathPerSqCalc(bed,bath,sq)
  {

  	return  sq/[bed + bath];
  };

  // ALGORITHM TO COMPUTE PRICE GIVEN BED/BATH/SQ-FT
  function propertyPriceCalculation(price,bed,bath,sq,otherProp)
  {
  	// add bathroom and bedrooms
  	// divide the square-feet by # of ba/br total
  	var bed_bath_sq_total = sq/[bed + bath];

  	// calculate ratio b*x = a*c
  	var determined_price = [price*otherProp]/bed_bath_sq_total;

  	return determined_price;
  };

/* Didn't want to reinvent the wheel!
   CODE Snippet taken from: https://gist.github.com/caseyjustus/1166258 
*/
function median(values) {

    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
};