$( window ).scroll(function() {
  var scroll = $(window).scrollTop();
  $(".resume").css({"right": 2*scroll});
  $(".twitter").css({"right": 2*scroll});
  $(".linkedin").css({"right": -2*scroll});
  $(".github").css({"right": -2*scroll});

});