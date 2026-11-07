import * as THREE from 'three'

//initializes window height and length
const wh = window.innerHeight;
const ww = window.innerWidth;

//create scene using THREE.js
const sc =  new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, ww / wh, 0.1, 1000);
cam.position.z = 3;//3 points forward

//create renderer
const rdr = new THREE.WebGLRenderer({ antialias: true});
rdr.setSize(ww, wh);
document.body.appendChild(rdr.domElement);

/*create Mesh for object
const m = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1),
  new THREE.MeshNormalMaterial()
);
sc.add(m);*/

//create heart shape
const heart = new THREE.Shape();
heart.moveTo( 25, 25);
heart.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heart.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heart.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heart.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heart.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heart.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
const extrudeSettings = {
	depth: 8,
	bevelEnabled: true,
	bevelSegments: 2,
	steps: 2,
	bevelSize: 1,
	bevelThickness: 1
};
const geometry = new THREE.ExtrudeGeometry( heart, extrudeSettings );
//put object at center
geometry.center();

//add white static I

//add white static U

//create mesh for heart
const m = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({
  color: 0xe0143c,
  roughness: 0.3,
  metalness: 0.2
}) );//color of heart set to red and surface made smooth


m.scale.set(0.02, -0.02, 0.02);//scale heart down
sc.add(m);//add mesh shape to scene

//function to animate
function animate(){
  requestAnimationFrame(animate);
  //m.rotation.x += 0.01; //rotate along the x axis
  m.rotation.y += 0.01;//rotate along the y axis
  rdr.render(sc, cam);//use renderer to create the scene and camera
}

animate();

//fit the window into the entire tab
window.addEventListener('resize', () => {
  const w = window.innerWidth;//internal width variable
  const h = window.innerHeight;//internal height variable
  cam.aspect = w / h;
  cam.updateProjectionMatrix();
  rdr.setSize(w, h);
});