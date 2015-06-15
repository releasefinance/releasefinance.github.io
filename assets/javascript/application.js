function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function populateHiddenShares(shares) {
  $('input[name="shares"]').val(shares);
}

function trackShareSignUpClick() {
  var shares = parseInt(getParameterByName('s'));
  var email  = $('input[name="email"]').val();
  var name   = $('input[name="name"]').val();

  populateHiddenShares(shares);
  analytics.track('share signup', {shares: shares, email: email, name: name});
}

var rangeAdjust = function(value) {
  if($("#fixedprice").length == 0) {
    return;
  }
  var shares          = parseInt(value);
  var price           = $("#fixedprice").html().replace(/\u00A3/g, '');
  var discountedPrice = Math.floor((20 - shares) * (price / 20.0 ))
  // return(Math.floor((20 - this.shares) * (this.car.price / 20.0 )));

  $('._total').html(shares);
  $('._discountedPrice').html('£' + discountedPrice);
  $('input').val(shares);

  $('.error.active').removeClass('active')

  analytics.track('evoque shares', {shares: shares, discounted_price: discountedPrice});

}

$(document).ready(function() {
  rangeAdjust(0);

  $('.price-share .button').on('click', function(e) {
    e.preventDefault();

    var input = $(this).parents('.price').find('input');
    var value = $(input).val();

    analytics.track('evoque share button clicked', {shares: value});

    if(value == 0) {
      $('.error').addClass('active');
    } else {
      var url = '/signup-with-sharing.html?s=' + value
      window.location.href = url;
    }
  });

  $("#share-signup-button").on('click', function(e){
    trackShareSignUpClick();
     // e.preventDefault();
  });
});
