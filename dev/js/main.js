//判断手机类型
window.onload = function () {
    //alert($(window).height());
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //屏蔽ios下上下弹性
        $(window).on('scroll.elasticity', function (e) {
            e.preventDefault();
        }).on('touchmove.elasticity', function (e) {
            e.preventDefault();
        });
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
    }
    loading()
}

// 配置  turn.js
function loading() {
  function loadApp() {
		$('.shade').hide()
  		$(".flipbook-viewport").show();
      var w = $(window).width();
      var h = $(window).height();
      $('.flipboox').width(w).height(h);
      $(window).resize(function () {
          w = $(window).width();
          h = $(window).height();
          $('.flipboox').width(w).height(h);
      });
      $('.flipbook').turn({
          // Width
          width: w,
          // Height
          height: h,
          // Elevation
          elevation: 50,
          display: 'single',
          // Enable gradients
          gradients: true,
          // Auto center this flipbook
          autoCenter: true,
          acceleration: true,
          when: {
              turning: function (e, page, view) {
              	var total = $(".flipbook").turn("pages");//总页数
                $('.current').text(page-1)
                $('.total').text(total-1)
                if (page == 1) {
                    $(".btnImg").css("display", "none");
                    $('.pagesCount').css("display", "none");
                  	$(".nextPage").css("display", "none");
                } else if(page == 3) {
                	setTimeout(function() {
										$('.wp .page').css({
											opacity: 1
										})
									},300)
                	$(".flipbook").turn("disable", true);
                	var upPages = $$('.wp-inner .page').length
                	$$('.wp-inner').fullpage({
                		drag: true,
                		afterChange: function(e) {
                			if(e.cur == (upPages - 1)) {
                				$(".flipbook").turn("disable", false);
                			} else {
                				$(".flipbook").turn("disable", true);
                			}
                		}
                	});
                	
                	$$.fn.fullpage.moveTo(0);
                	
                } else {
                  $(".btnImg").css("display", "block");
                  $(".nextPage").css("display", "block");
                }
                
              },
              turned: function (e, page, view) {
                  console.log(page);

                  if (page == 1) {
                		$('.pagesCount').css("display", "none");
                    $(".return").css("display", "none");
                    $(".btnImg").css("display", "none");
                  } else {
                		$('.pagesCount').css("display", "block");
                    $(".return").css("display", "block");
                    $(".btnImg").css("display", "block");
                  }
                  if (page == 2) {
                  	$('.name h1').addClass('swing')
                  } else {
                  }
              }
          }
      })
  }
  yepnope({
      test: Modernizr.csstransforms,
      yep: ['js/turn.js'],
      complete: loadApp
  });
}
