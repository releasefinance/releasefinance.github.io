var rangeAdjust = function(value) {
  var shares          = value;
  var price           = $("#fixedprice").html().replace(/\u00A3/g, '');
  var discountedPrice = Math.floor((20 - shares) * (price / 20.0 ))
  // return(Math.floor((20 - this.shares) * (this.car.price / 20.0 )));
  analytics.track('evoque shares', {shares: shares, discounted_price: discountedPrice});

  $('#total').html(shares);
  $('#discountedPrice').html('£' + discountedPrice);
  $('._total').html(shares);
  $('._discountedPrice').html('£' + discountedPrice);


}

$(document).ready(function() {
  rangeAdjust(0);
});
