/**
 * hatman -> https://sketchfab.com/3d-models/the-traveler-065fc05398bf4bcc915ed6ac36d844c5
 */


import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

// Canvas
const canvas = document.querySelector("canvas#three-ex");

//Ambient Light
//const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight)

const hatmanLight = new THREE.DirectionalLight(0xffff, 0.5);
directionalLight.position.set(1, 1, -1);
scene.add(directionalLight)


//Sphere and plane
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({});
material.roughness = 0.7;

const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 1, 0)
scene.add(sphere);

// load in model 
const loader = new GLTFLoader();

loader.load(
  '/media/hatman/scene.gltf', // path to your model
  (gltf) => {
    const hatman = gltf.scene;
    hatman.position.set(0, 0, 0); // position
    hatman.scale.set(1, 1, 1); // scale 
    hatman.rotation.y = Math.PI; // rotate 
    scene.add(hatman);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);
//scene.add( gltf.scene );



//const ground = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const ground = new THREE.MeshLambertMaterial({
  color: 0xffff,
  blending: THREE.NormalBlending,
 transparent: false
});
const plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), ground);
plane.receiveShadow = true; // Receives shadow

scene.add(plane);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;




const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//RENDER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
sphere.castShadow = true; // try to activate the least amount possible for browser efficiency 
plane.receiveShadow = true;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // we can make them more efficient, but needs to be by factors of 2
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 10; // adds bluring effect

// spotlight
const spotLight = new THREE.SpotLight(0xff0000 ,5, 10, Math.PI * 0.3)
//new
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

//const ambientLight = new THREE.AmbientLight(0xffffff, .25);
//const directionalLight = new THREE.DirectionalLight(0xffffff, .25);


//ANIMATE
window.requestAnimationFrame(animate);
function animate() {
  controls.update();

  let x = directionalLight.position.x // move light source
  //x+= Math.random(-1,0);
  console.log(x)
  directionalLight.position.set(x,5, 0)


  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

