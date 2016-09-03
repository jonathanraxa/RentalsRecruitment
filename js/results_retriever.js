function submitResults() {
    console.log("HELLO");
   // var licenseInfo = $('.pricing-option-' + mediaId + ':checked').val().split(':');
    
    var requestObject = {
        name: "BOB",
        // bedrooms: ,
        // bathrooms ,
        price: price

    }

    $.ajax({
        // type: 'POST',
        // url: 'ajax/submitPurchase.php',
        dataType: 'JSON',
        data: requestObject,
        success: function(data) {
            console.log(data);
            // $('#license-type-' + mediaId).html(licenseInfo[0] + ' | $' + licenseInfo[1]);
            //  <h3>Property Name</h3>
            // <span>Priced Recommenedation:</span><span id='pricing'><strong>$1,000</strong></span>
        }
    })
}