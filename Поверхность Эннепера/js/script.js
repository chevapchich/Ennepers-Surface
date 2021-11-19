window.onload = function(){

	var u =  500;
	var v =  500;	
	var canvas = document.getElementById('canvas');
	
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height',window.innerHeight);
	
	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);
		
	var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 5000);
	camera.position.set(0, 0,100);
	scene = new THREE.Scene();
	geometry = new THREE.ParametricGeometry( enSurf, u, v );
	material = new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading, side: 2 } )
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	function enSurf ( u, v, target ) {
		u = 1.5 * Math.PI * ( u - 0.5 );
		v *= 3 * Math.PI * ( v - 0.7 );

		var x = u - u*u*u / 3 + u*v*v;
		var y = v - v*v*v / 3 + u*u*v;
		var z = u*u - v*v;
		
		target.set(x, y, z).multiplyScalar(2);

		return new THREE.Vector3( x, y, z );
	}

	function loop(){
		mesh.rotation.y += Math.PI / 500;
		mesh.rotation.x += Math.PI / 500;
		mesh.rotation.z += Math.PI / 500;

		renderer.render(scene, camera);
		requestAnimationFrame(function(){loop();});
	}
		loop();
}