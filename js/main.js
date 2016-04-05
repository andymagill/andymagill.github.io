/* 
	Andrew Magill's Personal Website "Greetings Earthlings" JS document
	Author: Andrew Magill
*/

var ge = {}
ge.spotlight_anim_speed = 500;

$(document).ready(function() {

	$('.portfolio_item a').click(function() {

		// get the indexes of the elements we want to animate
		var portfolio_index = $(this).parent('.portfolio_item').index();
		var visible_index = $('.spotlight_item:visible').index();

		// toggle the clicked item as 'selected'
		$(this).parent('.portfolio_item').toggleClass('selected');

		// hide the visible element
		$('.spotlight_item').slideUp(ge.spotlight_anim_speed, function() {
			$('.portfolio_item:eq('+visible_index+')').removeClass('selected');
			console.log($(this).attr('class'));
		});

		// If the element we want to animate is not the one we just hid,
		if (visible_index != portfolio_index) {

			// animate the element
			var spotlight_elem = '.spotlight_item:eq('+portfolio_index+')';
			$(spotlight_elem).slideToggle(ge.spotlight_anim_speed, function() {
				console.log($(this).attr('class'));
			});
		}

		return false;
	});

	$("#contact_form").validate({
		email: {
			required: true,
			email: true
		},
		body: "required"
	});

});
