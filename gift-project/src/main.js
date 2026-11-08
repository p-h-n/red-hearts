import * as THREE from 'three'

//initializes window height and length
const wh = window.innerHeight;
const ww = window.innerWidth;

//create scene using THREE.js
const sc =  new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, ww / wh, 0.1, 1000);
cam.position.z = 4;//3 points forward
cam.position.y = 1;
cam.position.x = 1;

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
const I = new THREE.Shape();
I.moveTo(0, 0);
I.lineTo (0, 3);
I.lineTo(3, 3);
I.lineTo(3, 2);
I.lineTo(1.75, 2);
I.lineTo(1.75, 0);
I.lineTo(3, 0);
I.lineTo(3, -1);
I.lineTo(0, -1);
I.lineTo(0, 0)
I.lineTo(1.25, 0);
I.lineTo(1.25, 2);
I.lineTo(0, 2);
//I.lineTo(0, 0);

//geometry of I
const I_geometry = new THREE.ShapeGeometry(I);
//mesh material of I
const temp = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
//I mesh
const I_m = new THREE.Mesh(I_geometry, temp);

//I position
I_m.position.z = -2;
I_m.position.y = 0;
I_m.position.x = -5;

//add to scene
sc.add(I_m);

//add white static U
//triangle template for now
const U = new THREE.Shape();
U.moveTo(0, 0);
U.lineTo (1, 2);
U.lineTo(2, 0);
U.lineTo(0, 0);
//U.lineTo(0, 0);

//geometry of U
const U_geometry = new THREE.ShapeGeometry(U);
//mesh material of U
const tempU = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
//U mesh
const U_m = new THREE.Mesh(U_geometry, tempU);

//I position
U_m.position.z = 0;
U_m.position.y = 0;
U_m.position.x = 3;

//add to scene
sc.add(U_m);


//create mesh for heart
const m = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({
  color: 0xe0143c,
  roughness: 0.3,
  metalness: 0.2
}) );//color of heart set to red and surface made smooth


m.scale.set(0.02, -0.02, 0.02);//scale heart down

//position of heart
m.position.z = 0;
m.position.y = 1;
m.position.x = 1

sc.add(m);//add heart mesh to scene

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