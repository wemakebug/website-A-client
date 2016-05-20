$(function(){
	/**
	 * 
	 */
	var 
	$nav = $('.nav'),
	$cn  = $('.central-news'),
	old_top = 0,
	nav_top = $nav.offset().top
	;

	$(window).on('scroll',NavHandler)

	function NavHandler(e){
      var current_top = $(document).scrollTop()

      if(current_top >= nav_top) {
        $nav.addClass('nav-active')
        $cn.addClass('central-news-active')
      } else {
        $nav.removeClass('nav-active')
        $cn.removeClass('central-news-active')
      }

    }

})