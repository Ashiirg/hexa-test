$( document ).ready(function() {
  let years = ['TODAY','2017','2015','2012','2011','2007','2006','2004','2001'];
  let rotates = ['28','21','14','7','0','-7','-14','-21','-28'];
  let width = screen.width;

  if(width <= 560) {
    rotates = ['-62','-69','-76','-83','-90','-97','-104','-111','-118'];
  }

  const slider = $('.slick-wrap');
  slider.on('afterChange init', function(event, slick, direction){
    // remove all prev/next
    slick.$slides.removeClass('prevdiv').removeClass('nextdiv');

    // find current slide
    for (var i = 0; i < slick.$slides.length; i++)
    {
      var $slide = $(slick.$slides[i]);
      if ($slide.hasClass('slick-current')) {
          // update DOM siblings
          $slide.prev().addClass('prevdiv');
          $slide.next().addClass('nextdiv');
          break;
      }
    }
  })
  .slick({
    vertical: true,
    infinite: true,
    centerMode: true,
    swipe: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data();
      return '<a class="dot" data-rotate="'+rotates[i]+'" onclick="sliderDotsRotate('+rotates[i]+')">'+years[i]+'</a>';
    },
  });

  if(width > 768 || width <= 480) {
    slider.on('wheel', (function(e) {
      e.preventDefault();
    
      if (e.originalEvent.deltaY > 0) {
        $(this).slick('slickNext');
        let deg = $(".slick-dots .slick-active a").data("rotate");
        sliderDotsRotate(deg);
      } else {
        $(this).slick('slickPrev');
        let deg = $(".slick-dots .slick-active a").data("rotate");
        sliderDotsRotate(deg);
      }
    }));
  }
  if(width < 480) {
    $('.slick-dots li a').on('click', function(e){
      e.stopPropagation();
    });
    $(".dot").removeAttr('onclick');
  }

  slider[0].slick.slickGoTo(parseInt(4));

  $('#nav-icon3').click(function(){
    $(this).toggleClass('open');
    $(".nav").toggleClass('nav-open');
	});

});

function sliderDotsRotate(deg) {
  $('.slick-dots').css("transform", "rotate("+deg+"deg)");
}