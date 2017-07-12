
/* 
	Andrew Magill's Personal Website "Greetings Earthlings" JS document
	Author: Andrew Magill
*/

var ge = {}
ge.spotlight_anim_speed = 500;

$(document).ready(function() {
	function showFragment(){
		console.log(window.location.hash);

		// $('html, body').animate({
	 //       scrollTop: $(this).offset().top
	 //    }, 2000);
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


    $('.profile').on('click', '', function(){
    	$(this).addClass('animated shake');
    });

	$('#resume_nav').click( function(){

		window.location.hash = 'resume';
	});

	$('.btm_links a').click( function(){
	});

	$('.portfolio_item a').click(function() {

		// get the indexes of the elements we want to animate
		var portfolio_index = $(this).parent('.portfolio_item').index();
		var visible_index = $('.spotlight_item:visible').index();

		// toggle the clicked item as 'selected'
		$(this).parent('.portfolio_item').toggleClass('selected');

		// hide the visible element
		$('.spotlight_item').slideUp(ge.spotlight_anim_speed, function() {
			$('.portfolio_item:eq('+visible_index+')').removeClass('selected');
		});

		// If the element we want to animate is not the one we just hid,
		if (visible_index != portfolio_index) {

			// animate the element
			var spotlight_elem = '.spotlight_item:eq('+portfolio_index+')';
			$(spotlight_elem).slideToggle(ge.spotlight_anim_speed);
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
	    console.log( document.getElementById('canvas_container'));
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
				//console.log(widths[context.id]);

				var _color = new THREE.Color(context.strokeStyle);
				_color.setHSL(_color.getHSL().h+0.96, _color.getHSL().s, _color.getHSL().l);
				context.strokeStyle= _color.getStyle();
				_color.setHSL(_color.getHSL().h, 1, .96);

				context.lineWidth = 0.03;
				context.beginPath();
				// context.arc( 0, 0, 0.5, 0, PI2*.25, true );
				context.lineTo( 0, 0);
				context.lineTo( .1, 0);
				context.lineTo( .1, .2);
				context.lineTo( -.1, .2);
				context.lineTo( -.1, 0);
				context.lineTo( 0, 0);

				//console.log(_color.getHSL().h);
				//console.log(_color.getHSL());

				context.fillStyle = _color.getStyle();
				// context.shadowBlur = 100;
				// context.shadowColor= '#ffffff';
				// context.shadowOffsetX = 0;
				// context.shadowOffsetY = 0;
				//context.drop
				//context.fillStyle.color.r = 1;
				//console.log(context);
				context.fill();
				context.stroke();





		};

		group = new THREE.Group();
		scene.add( group );


		// function addShape( shape, color, x, y, z, rx, ry, rz, s ) {
		// 	// flat shape
		// 	var geometry = new THREE.ShapeGeometry( shape );
		// 	var material = new THREE.MeshBasicMaterial( { color: color, strokeStyle: color, overdraw: 0.5 } );
		// 	var mesh = new THREE.Mesh( geometry, material );
		// 	mesh.position.set( x, y, z );
		// 	mesh.rotation.set( rx, ry, rz );
		// 	mesh.scale.set( s, s, s );
		// 	group.add( mesh );
		// 	// line
		// 	var geometry = shape.createPointsGeometry();
		// 	geometry.vertices.push( geometry.vertices[ 0 ].clone() );
		// 	var material = new THREE.LineBasicMaterial( { linewidth: 10, color: color, transparent: true } );
		// 	var line = new THREE.Line( geometry, material );
		// 	line.position.set( x, y, z );
		// 	line.rotation.set( rx, ry, rz );
		// 	line.scale.set( s, s, s );
		// 	group.add( line );
		// }



		for ( var i = 0; i < 250; i++ ) {

			// var rectLength = 120, rectWidth = 40;
			// var rectShape = new THREE.Shape();
			// rectShape.moveTo( 0, 0 );
			// rectShape.lineTo( 0, rectWidth );
			// rectShape.lineTo( rectLength, rectWidth );
			// rectShape.lineTo( rectLength, 0 );
			// rectShape.lineTo( 0, 0 );	
			// group.add( rectShape );

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

			// var line_geometry = new THREE.Geometry({
			// 	color: 0x000000
			// });

			// line_geometry.vertices.push(
			// 	new THREE.Vector3( rndX, rndY, rndZ ),
			// 	new THREE.Vector3( 50, rndY, rndZ),
			// 	new THREE.Vector3( 50, 50, rndZ),
			// 	new THREE.Vector3( rndX, 50, rndZ),
			// 	new THREE.Vector3( rndX, rndY, rndZ)
			// );

			// var line = new THREE.Line( line_geometry, line_material );
			// group.add( line );

			particle = new THREE.Sprite( material );
			particle.position.x = rndX;
			particle.position.y = rndY;
			particle.position.z = rndZ;
			particle.scale.x = _scaleX;
			particle.scale.y = _scaleY;
			particle.rotation = Math.random() * 1;
			group.add( particle );

			// Square
			// var sqLength = _scale;
			// var squareShape = new THREE.Shape();
			// squareShape.moveTo( rndX,rndY,rndZ );
			// squareShape.lineTo( rndX, rndY+sqLength,rndZ );
			// squareShape.lineTo( rndX+sqLength, rndY+sqLength,rndZ );
			// squareShape.lineTo( rndX+sqLength, rndY ,rndZ);
			// squareShape.lineTo( rndX, rndY,rndZ );

			// addShape( squareShape, _color, rndX,rndY,rndZ, 0, 0, 0, 1 );
			//group.add( squareShape );
		}

		renderer = new THREE.CanvasRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0xffffff, 1 );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

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

	//

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
