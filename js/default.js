
$(document).ready(function() {

    var $window = $(window)
   	   ,winW = $window.width()
       ,winH = $window.height()
       ,$body = $("body")
       ,$html = $("html")
       ,$htmlBody = $("html , body")
       ,$header = $("#header")
       ,$Top = $(".Top")


       ,$min_lg = $html.hasClass('min-lg-size')
       ,$max_lg = $html.hasClass('max-lg-size')
       ;

    /* ===========================================================
       default
    =============================================================*/

    setTimeout(function() {
        $([$body, $header]).each(function() {
            $(this).addClass('is-start');
        });
    }, 200);

    $(".imgLiquidFill").each(function() {
        $(this).imgLiquid({
          fill: true,
          horizontalAlign: "center",
          verticalAlign: "center",
          autoHideScrollbar: false
        });
    });

    var isIpadSize = winW < 1199;
    $("#header a").mPageScroll2id({
        offset: isIpadSize ? 95 : 68,
         // scrollSpeed: 550,
         // scrollEasing: "easeOutCirc"
    });


     // wow
    var isIpadSize = winW < 1199;
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated08s', // default
        offset: isIpadSize ? 0 : 120,
        mobile: true, // default
        live: true // default
    })
    wow.init();



    /* ===========================================================
        common
    =============================================================*/

    $window.scroll(function() {
      if ($(this).scrollTop() > 100) {
          $Top.fadeIn(250);
          $header.addClass('is-scrolled');
      } else {
           $Top.stop().fadeOut(200);
           $header.removeClass('is-scrolled');
      }
    }).scroll();

    //Top
    $Top.on('click', function() {
        $htmlBody.stop(true,false).animate({scrollTop:0},600,"easeInOutCirc");
        return false;
    });




}); //end ready
