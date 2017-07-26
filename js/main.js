
/* 
	Andrew Magill's Portfolio JS document
	Author: Andrew Magill
*/

var ge = {}
ge.spotlight_anim_speed = 500;

$(document).ready(function() {

	// Deep linking
	function showFragment(){

		$('.btm_links a.tab').removeClass('tab');
		$('.fragment_container section').hide();
		$('.fragment_container '+window.location.hash).show();
		$('.btm_links '+window.location.hash+'_nav').addClass('tab');

		if (window.location.hash == '#resume'){
			$('#resume_nav').addClass('tab');
		}
		if (window.location.hash == '#email'){
			$('.email').show();
			$('.emailLink').addClass('tab');
		}
	}

	$(window).on('hashchange', function() {
		showFragment();
	});
	showFragment();

	$('#resume_nav').click( function(){

		window.location.hash = 'resume';
	});

	// dumb profile pic animation
    $('.profile').on('click', '', function(){
    	$(this).addClass('animated shake');
    });

    // Portfolio accordion 
	var allPanels = $('.portfolio_item > .portfolio_details').hide();
    
	$('.portfolio_item > a').click(function() {

		$('.portfolio_item').removeClass('selected');
		$(this).parent().addClass('selected');
		$target =  $(this).next();

		if(!$target.is(':visible')){
			allPanels.slideUp(ge.spotlight_anim_speed);
			$target.slideDown(ge.spotlight_anim_speed);
		}

	return false;
	});

	// form validation
	$("#contact_form").validate({
		email: {
			required: true,
			email: true
		},
		body: "required"
	});

	// display form success message
	if (window.location.hash == "#thanks") {
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 200, function(){
			$('.email_inner').hide(500, function(){
				$('.form_success').show(500);
			});
		});
	}

});


// Background Canvas Animation

var bgAnim = function() {

	var container;
	var camera, scene, renderer, group, particle;
	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	$(function() {
		init();
		animate();
	});

	function init() {

		container = document.createElement( 'div' );
		document.getElementById('canvas_container').appendChild( container );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();

		var PI2 = Math.PI * 2;



		var program = function ( context ) {

				var _color = new THREE.Color(context.strokeStyle);
				_color.setHSL(_color.getHSL().h+0.96, _color.getHSL().s, _color.getHSL().l);
				context.strokeStyle= _color.getStyle();
				_color.setHSL(_color.getHSL().h, 1, .96);

				context.lineWidth = 0.03;
				context.beginPath();
				context.lineTo( 0, 0);
				context.lineTo( .1, 0);
				context.lineTo( .1, .2);
				context.lineTo( -.1, .2);
				context.lineTo( -.1, 0);
				context.lineTo( 0, 0);

				context.fillStyle = _color.getStyle();
				context.fill();
				context.stroke();

		};

		group = new THREE.Group();
		scene.add( group );


		for ( var i = 0; i < 250; i++ ) {

			var _color = 'hsl('+(parseInt(Math.random() * 60))+', '+(parseInt(Math.random() * 20)+80)+'%, '+(parseInt(Math.random() * 20)+60)+'%)';

			var material = new THREE.SpriteCanvasMaterial( {
				color: _color,
				transparent: true,
				opacity: 0.60,
				program: program
			} );

			var line_material = new THREE.LineBasicMaterial({
				color: _color,
				transparent: true,
				opacity: 1,
				linewidth: 15
			});
			var rndX = Math.random() * 2000 - 1000;
			var rndY = Math.random() * 2000 - 1000;
			var rndZ = Math.random() * 2000 - 1000;
			var _scaleX = Math.random() * 600 + 400;
			var _scaleY = Math.random() * 600 + 400;

			particle = new THREE.Sprite( material );
			particle.position.x = rndX;
			particle.position.y = rndY;
			particle.position.z = rndZ;
			particle.scale.x = _scaleX;
			particle.scale.y = _scaleY;
			particle.rotation = Math.random() * 1;
			group.add( particle );

		}

		renderer = new THREE.CanvasRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0xffffff, 1 );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );


		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function animate() {

		requestAnimationFrame( animate );
		render();
	}

	function render() {

		camera.position.x += ( mouseX - camera.position.x ) * 0.02;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.02;
		camera.lookAt( scene.position );

		group.rotation.x += 0.001;
		group.rotation.y += 0.002;

		renderer.render( scene, camera );
	}
}

bgAnim();
