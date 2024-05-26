/* custom scripts */

jQuery(document).ready(function($) {
  /* Script to add border bottom to navbar on scroll */
  $(window).on("scroll", function() {
    var wn = $(window).scrollTop();
    if (wn > 20) {
      $(".navbar").css("border-bottom", "1px solid #eee");
      $(".navbar").css("transition-duration", "0.2s");
    } else {
      $(".navbar").css("border-bottom", "0px solid #eee");
      $(".navbar").css("background", "#fff");
    }
  });

  /* Script to smoothly scroll to pages */
  $(function() {
    $("a.page-scroll").on("click", function(e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top - 50
          },
          1000
        );
      e.preventDefault();
    });
  });

  /* Script to init WOW js for animate on scroll */
  new WOW().init();
});
