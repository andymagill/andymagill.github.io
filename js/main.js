/* 
	Andrew Magill's Personal Website "Greetings Earthlings" JS document
	Author: Andrew Magill
*/

var ge = {}
ge.spotlight_anim_speed = 600;

$(document).ready(function() {

	$('.portfolio_item a').click(function() {

		$('.spotlight_item').slideUp(ge.spotlight_anim_speed);

		// get the spotlight element we want to animate, current height and target height
		var spotlight_elem = '.spotlight_item:eq('+$(this).parent('.portfolio_item').index()+')';
		var target_height = $(spotlight_elem).attr('data-height');

		//animate the element
		$(spotlight_elem).slideToggle(ge.spotlight_anim_speed);

		return false;
	});
});