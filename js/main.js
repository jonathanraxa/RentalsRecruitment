
$(document).ready(function(){

$.ajax({
    type: "GET",
    url: "/data/challenge_data.csv",
    data: {},
    success: function(data){
      handleFileSelect(data); 
    }
  });

 //$("#csv-file").change(handleFileSelect);


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
                .find('[name="name"]').attr('class', 'form-control row-' + propertyIndex).end()
                .find('[name="bedrooms"]').attr('class', 'form-control row-' + propertyIndex).end()
                .find('[name="bathrooms"]').attr('class', 'form-control row-' + propertyIndex).end()
                .find('[name="squarefeet"]').attr('class', 'form-control row-' + propertyIndex).end();


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

$("#results").append("<p style='font-size:xx-large'><span class='user_results' style='font-size: 45px;' id='name-"+index+"'></span> with <span class='user_results' id='bedrooms-"+index+"'></span> bedroom(s) & <span class='user_results' id='bathrooms-"+index+"'></span> bathroom(s) at <span class='user_results' id='squarefeet-"+index+"'></span>sq-ft is valued at: <br><span class='user_results' style='font-size: 45px;' id='price-"+index+"'></span>(USD)</p>");

    var $row = $('.row-'+index);

    $row.each(function(i, input) {
      var id = input.name + '-' + index;
		  $("#" + id).html(input.value);
    });

		var userPropNoPrice = propertyBedBathPerSqCalc(parseInt($row[1].value),parseInt($row[2].value),parseInt($row[3].value));

		var userPropWithPrice = propertyPriceCalculation(price_standard,
													  bedrooms_standard,
													  bathroom_standard, 
													  square_ft_standard,
													  userPropNoPrice);

		$("#price-"+index).html('$' + Math.round(userPropWithPrice) + " ");

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
