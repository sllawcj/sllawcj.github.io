"use strict";
var fixed_menu = true;
window.jQuery = window.$ = jQuery;

function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	
	$('#menu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('#menu li.scrollable')
			.removeClass('current-menu-item')
			.eq(i).addClass('current-menu-item');
			
			$('#menu li').first().addClass('current-menu-item');			
		}
	})	
};

jQuery(document).ready(function() {
	"use strict";	
	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {		
		jQuery('.fixed-menu').append(jQuery('header.main_header').html());
		var fixd_menu = setInterval(scrolled_menu, 100);		
	}
	
	// if single_page
	if (jQuery("body").hasClass("single_page")) {				
	}
	else {
		// Activate Menu Link
		calculateScroll();
	}
	
	// if single_page
	if (jQuery("body").hasClass("single_page")) {			
	}
	else {
		$(window).scroll(function(event) {
			calculateScroll();
		});
		$('#menu li.scrollable a').click(function() {  
			if (jQuery(window).width() > 760) {
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 1000);
			} else {
				$('html, body').animate({scrollTop: $(this.hash).offset().top}, 1000);
			};
			return false;
		});
	};
	
	// Skills
	if (jQuery(window).width() > 760) {
		jQuery('.skill_wrap').waypoint(function(){
			jQuery('.skill .skill_text').each(function(){
				jQuery(this).easyPieChart({
					size:80,
					barColor: jQuery(this).parents('.skill').attr('data-color'),
					trackColor: '#e2e2e2',
					scaleColor: false,
					lineCap: 'butt',
					rotate: 0,
					lineWidth: 3,
					animate: 1000		
				});		
			});
		},{offset: 'bottom-in-view'});
	} else {
		jQuery('.skill .skill_text').each(function(){
			jQuery(this).easyPieChart({
				size:80,
				barColor: jQuery(this).parents('.skill').attr('data-color'),
				trackColor: '#e2e2e2',
				scaleColor: false,
				lineCap: 'butt',
				rotate: 0,
				lineWidth: 3,
				animate: 1000		
			});		
		});
	};
	
	// Aaccordion 
	jQuery('.shortcode_accordion_item_title').click(function(){
		if (!jQuery(this).hasClass('state-active')) {
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp('fast');
			jQuery(this).next().slideToggle('fast');
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
			jQuery(this).addClass('state-active');
		}
	});
	jQuery('.shortcode_toggles_item_title').click(function(){
		jQuery(this).next().slideToggle('fast');
		jQuery(this).toggleClass('state-active');
	});

	jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function( index ) {
		jQuery(this).next().slideDown('fast');
		jQuery(this).addClass('state-active');
	});
	
	$('.shortcode_iconbox').waypoint(function(){																
		if (!$(this).hasClass('gt3_showed_element')) {
			$(this).addClass('gt3_showed_element');
		}
	});
	
	$('.item_list .item').waypoint(function(){																
		if (!$(this).hasClass('gt3_showed_element')) {
			$(this).addClass('gt3_showed_element');
		}
	},{offset: 'bottom-in-view'});
		
	// Tabs
	jQuery('.shortcode_tabs').each(function(index) {
		/* GET ALL HEADERS */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_title').each(function(index) {
		jQuery(this).addClass('it'+i); jQuery(this).attr('whatopen', 'body'+i);
		jQuery(this).addClass('head'+i);
		jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
		i++;
		});
	
		/* GET ALL BODY */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_body').each(function(index) {
		jQuery(this).addClass('body'+i);
		jQuery(this).addClass('it'+i);
		jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
		i++;
		});
	
		/* OPEN ON START */
		jQuery(this).find('.expand_yes').addClass('active');
		var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
		jQuery(this).find('.'+whatopenOnStart).addClass('active');
		});
	
		jQuery(document).on('click', '.shortcode_tab_item_title', function(){
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
		var whatopen = jQuery(this).attr('whatopen');
		jQuery(this).parents('.shortcode_tabs').find('.'+whatopen).addClass('active');
		jQuery(this).addClass('active');
	});
	
	if(jQuery(window).width() > 760) {
		jQuery('.shortcode_tabs').each(function(){
			if(jQuery(this).hasClass('type2')) {
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+25+'px');
				jQuery(this).append('<div class="clear"/>');
			}
			if(jQuery(this).hasClass('type3')) {
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+'px');
				jQuery(this).append('<div class="clear"/>');
			}
		});
	}	
	
	// PrettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	// Contact Form
	jQuery('.feedback_go').click(function(){
		var par = jQuery(this).parents(".feedback_form");
		var name = par.find(".field-name").val();
		var email = par.find(".field-email").val();
		var message = par.find(".field-message").val();
		var subject = par.find(".field-subject").val();
		if (email.indexOf('@') < 0) {			
			email = "mail_error";
		}
		if (email.indexOf('.') < 0) {			
			email = "mail_error";
		}
		jQuery.ajax({
			url: "mail.php",
			type: "POST",
			data: { name: name, email: email, message: message, subject: subject },
			success: function(data) {
				jQuery('.ajaxanswer').hide().empty().html(data).fadeIn("slow");
				setTimeout("jQuery('.ajaxanswer').fadeOut('slow')",5000);
		  }
		});
	});
	
	//Iframe transparent
	jQuery("iframe").each(function(){
		var ifr_source = jQuery(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		jQuery(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else jQuery(this).attr('src',ifr_source+'?'+wmode);
	});
	
	//Mobile Menu
	jQuery('#menu').slicknav();	
	
});
  
jQuery(window).load(function () {
	"use strict";	
	// Parallax
	if (jQuery(window).width() > 1025) {
		jQuery('.parallax').parallax("50%", 0.5);
		jQuery('.bg-1').parallax({
			speed :	0.15
		});	
		jQuery('.bg-2, .bg-3, .bg-4, .bg-5, .bg-6').parallax({
			speed :	0.25
		});
	}	
				    
});

function scrolled_menu() {
	"use strict";
	if (jQuery(window).scrollTop() > jQuery('header.main_header').height()) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};
	