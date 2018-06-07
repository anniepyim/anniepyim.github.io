$(document).ready(function() {

    /* ======= Scrollspy ======= */
   $('body').scrollspy({ target: '#page-nav-wrapper', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
        
        console.log(target) 
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -60, 'axis':'y'});
		
	});
	
	/* ======= Fixed page nav when scrolled ======= */    
    $(window).on('scroll resize load', function() {
        
        $('#page-nav-wrapper').removeClass('fixed');
         
         var scrollTop = $(this).scrollTop();
         var topDistance = $('#page-nav-wrapper').offset().top;
         
         if ( (topDistance) > scrollTop ) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
         }
         else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
         }

    });
    
    /* ======= Load skills when scrolled ======= */  

    $('.skills-scale').each(function(){
      var perc = $(this).find('.percent').data('percent');

      $(this).data('width',perc);
    })

  $('#skills-section').waypoint(function(){

    $('.skills-icon').each(function(){
        $(this).css({'width':$(this).data('width')+'%'});
      }) 

  },{offset:'40%'});

    $('.scrollimation').waypoint(function(){
        $(this).addClass('in');
    },{offset:'90%'});


    /* ======= Control Carousel ======= */ 

    $('.item-interest').click(function(){

        $('.item-interest').each(function(){
            $(this).removeClass("highlight");
        })

        $(this).addClass("highlight");

        $('.item-carousel').each(function(){
            $(this).hide();
        })
        $($(this).data('carousel')).show()
    });


});