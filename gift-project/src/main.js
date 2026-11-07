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

//create Mesh for object
const m = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1),
  new THREE.MeshNormalMaterial()
);
sc.add(m);

//function to animate
function animate(){
  requestAnimationFrame(animate);
  m.rotation.x += 0.01; //rotate along the x axis
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