$(function() {

  "use strict";

  var htmlBody = $("html,body");
  var windowWidth = $(window).width();

  /*===============================================
    Preloader
  ===============================================*/
  $(window).load(function () {
    $("body").addClass("loaded");
  });


  /*===============================================
    Parallax
  ===============================================*/
  $(".parallax").jarallax({
    speed: 0.2
  });


  /*===============================================
    Scroll Spy
  ===============================================*/
  $('body').scrollspy({ 
    target: '.menu', 
    offset: 50
  });


  /*===============================================
    Toggle Menu
  ===============================================*/
  var menu = $(".menu");
  var toggleBtn = $(".toggle-btn");

  toggleBtn.on("click", function(e) {
    if (menu.hasClass("show-menu")) {
      menu.removeClass("show-menu");
    }
    else {
      menu.addClass("show-menu");
    }
    e.stopPropagation();
  });

  // Navicon transform into X //
  toggleBtn.on("click", function() {
    if (toggleBtn.hasClass("toggle-close")) {
      toggleBtn.removeClass("toggle-close");
    }
    else {
      toggleBtn.addClass("toggle-close");
    }
  });

  // Close Menu
  if (windowWidth <= 767) {
    $(document).on("click", function() {
      if (menu.hasClass("show-menu")) {
        menu.removeClass("show-menu");
      }
      if (toggleBtn.hasClass("toggle-close")) {
        toggleBtn.removeClass("toggle-close");
      }
    });
  }


  /*===============================================
    Smooth Scrolling on links
  ===============================================*/
  var ssBtns = $(".nav li a, .btn-style");

  ssBtns.on("click", function(e) {
    htmlBody.animate({scrollTop: $(this.hash).offset().top}, 700, "easeInOutQuart");
    e.preventDefault();
  });


  /*===============================================
    Counter
  ===============================================*/
  $(".counter").appear(function() {

    $(this).each(function () {
      $(this).prop("Counter",0).animate({
          Counter: $(this).text()
      }, {
          duration: 3000,
          easing: "swing",
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
    
  },{accX: 0, accY: -10});


  /*===============================================
    Easy Pie Chart
  ===============================================*/
  $(".pie-chart").appear(function() {

    $(this).each(function() {
      $(this).easyPieChart({
        lineCap: 'square',
        onStep: function(from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent));
        }
      });
    });
    
  },{accX: 0, accY: -10});


  /*===============================================
    Magnific Popup
  ===============================================*/
  $('.lightbox-popup').magnificPopup({ 
    type:'inline',
    fixedContentPos: false,
    removalDelay: 100,
    closeBtnInside: true,
    preloader: false,
    mainClass: 'mfp-fade'
  });


  /*===============================================
    Owl Carousel Sliders
  ===============================================*/
  $(".owl-carousel").each( function() {
    var $carousel = $(this);

    var $defaults = {
      rewind: true,
      navText: ["<i class='ti-angle-left'></i>","<i class='ti-angle-right'></i>"],
      autoHeight: true, 
      autoplayTimeout: 4000,
      autoplayHoverPause: true
    }

    var $options = {
      items: $carousel.data("owl-items"),
      margin: $carousel.data("owl-margin"),
      loop: $carousel.data("owl-loop"),
      center: $carousel.data("owl-center"),
      mouseDrag: $carousel.data("owl-mouseDrag"),
      touchDrag: $carousel.data("owl-touchDrag"),
      pullDrag: $carousel.data("owl-pullDrag"),
      freeDrag: $carousel.data("owl-freeDrag"),
      stagePadding: $carousel.data("owl-stagePadding"),
      autoWidth: $carousel.data("owl-autoWidth"),
      startPosition: $carousel.data("owl-startPosition"),
      URLhashListener: $carousel.data("owl-URLhashListener"),
      nav: $carousel.data("owl-nav"),
      rewind: $carousel.data("owl-rewind"),
      navElement: $carousel.data("owl-navElement"),
      slideBy: $carousel.data("owl-slideBy"),
      dots: $carousel.data("owl-dots"),
      dotsEach: $carousel.data("owl-dotsEach"),
      autoplay: $carousel.data("owl-autoplay"),
      autoplayTimeout: $carousel.data("owl-autoplayTimeout"),
      smartSpeed: $carousel.data("owl-smartSpeed"),
      fluidSpeed: $carousel.data("owl-fluidSpeed"),
      autoplaySpeed: $carousel.data("owl-autoplaySpeed"),
      navSpeed: $carousel.data("owl-navSpeed"),
      dotsSpeed: $carousel.data("owl-dotsSpeed"),
      dragEndSpeed: $carousel.data("owl-dragEndSpeed"),
      callback: $carousel.data("owl-callback"),
      video: $carousel.data("owl-video"),
      videoHeight: $carousel.data("owl-videoHeight"),
      videoWidth: $carousel.data("owl-videoWidth"),
      itemElement: $carousel.data("owl-itemElement"),
      stageElement: $carousel.data("owl-stageElement"),
      navContainer: $carousel.data("owl-navContainer"),
      dotsContainer: $carousel.data("owl-dotsContainer")
    }

    var $responsive = {
      responsive: {
        0 : {
          items: $carousel.data("owl-xs")
        },
        // breakpoint from 576px+
        576 : {
          items: $carousel.data("owl-sm")
        },
        // breakpoint from 768px+
        768 : {
          items: $carousel.data("owl-md")
        },
        // breakpoint from 992px+
        992 : {
          items: $carousel.data("owl-lg")
        },
        // breakpoint from 1200px+
        1200 : {
          items: $carousel.data("owl-xl")
        }
      }
    }

    $carousel.owlCarousel( $.extend( $defaults, $options, $responsive) );
  });


  /*===============================================
    Google Maps
  ===============================================*/
  // Map Initial Location
  var initLatitude = 51.513569; // <- Latitude here
  var initLongitude = -0.123443; // <- Longitude here
  
  var map = new GMaps({
    el: '#map-canvas',
    lat: initLatitude,
    lng: initLongitude,
    zoom: 16,
    scrollwheel: false
  });
  map.addMarker({
    lat : initLatitude,
    lng : initLongitude
  });


  /*===============================================
    Contact Form
  ===============================================*/
  $("#contactform").on("submit", function(e) {
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    if (name === "") {
      $("#name").addClass("error-color");
    }
    if (email === "") {
      $("#email").addClass("error-color");
    }
    if (subject === "") {
      $("#subject").addClass("error-color");
    }
    if (message === "") {
      $("#message").addClass("error-color");
    }

    else {
      $.ajax({
        url:"../assets/php/contact-form.php",
        data:$(this).serialize(),
        type:"POST",
        success:function(data){
          $("#success").addClass("show-result"); //=== Show Success Message==
          $("#contactform").each(function(){
            this.reset();
          });
        },
        error:function(data){
          $("#error").addClass("show-result"); //===Show Error Message====
        }
      });
      var forms = $("#contactform input, #contactform textarea");
      forms.removeClass("error-color");
    }

    e.preventDefault();
  });


});