var propertyIndex = 0;
var data;

$(document).ready(function(){

 // FETCH CSV DATA TO USE FOR ALGORITHM
 data_fetcher.fetch_csv_file();

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

// POPULATES THE RESULTS MODAL
var app = {
  populate: function(){
    for(i = 0; i <= propertyIndex; i++) {
      this.write_results(i);
    }
  $("#results").modal("show");
  
  },

  // CALCULATES AND WRITES USER RESULTS TO RESULTS MODAL
  write_results: function (index) {
    var $row = $('.row-'+index);

    $("#results_body").append("<p style='font-size:font-size:15px;'><span class='user_results' style='font-size: 25px;' id='name-"+index+"'></span><br /> with <span class='user_results' id='bedrooms-"+index+"'></span> bedroom(s) & <span class='user_results' id='bathrooms-"+index+"'></span> bathroom(s) at <span class='user_results' id='squarefeet-"+index+"'></span>sq-ft is valued at: <br><span class='user_results' style='font-size: 25px;' id='price-"+index+"'></span>(USD)</p><hr>");

    $row.each(function(i, input) {
      var id = input.name + '-' + index;
      $("#" + id).html(input.value);
    });

    var userPropNoPrice = calculations.ratio_standard(parseInt($row[1].value),
                                                      parseInt($row[2].value),
                                                      parseInt($row[3].value));

    var userPropWithPrice = calculations.price_calculation(price_standard,
                                                           bedrooms_standard,
                                                           bathroom_standard, 
                                                           square_ft_standard,
                                                           userPropNoPrice);

    $("#price-"+index).html('$' + Math.round(userPropWithPrice) + " ");

  }
}


// DISPLAY HTML GIVEN ARGUMENT VALUES
function displayPropertyPrice(){

  var propertyValNoPrice1 = calculations.price_calculation(2,2,1250);
  var property_price1 = calculations.price_calculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice1);
  $( "#price1" ).append("$" + Math.round(property_price1) );

  var propertyValNoPrice2 = calculations.ratio_standard(1,1,750);
  var property_price2 = calculations.price_calculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice2);
  $( "#price2" ).append("$" + Math.round(property_price2) );

  var propertyValNoPrice3 = calculations.ratio_standard(3,1,1500);
  var property_price3 = calculations.price_calculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice3);
  $( "#price3" ).append("$" + Math.round(property_price3) );

  var propertyValNoPrice4 = calculations.ratio_standard(4,2,2250);
  var property_price4 = calculations.price_calculation(price_standard, bedrooms_standard, bathroom_standard, square_ft_standard,propertyValNoPrice4);
  $( "#price4" ).append("$" + Math.round(property_price4) );

  return [property_price1,property_price2,property_price3, property_price4];

};


// RELOADS THE PAGE UPON SEEING RESULTS OF MODAL
function page_reload(){
  location.reload();
}