/**
 * hatman -> https://sketchfab.com/3d-models/the-traveler-065fc05398bf4bcc915ed6ac36d844c5
 */


import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// for orb
import { EffectComposer } from 'https://unpkg.com/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js';


const scene = new THREE.Scene();

// Canvas
const canvas = document.querySelector("canvas#three-ex");

// fog 
const color = 0x000000;
const density = 0.02;
scene.fog = new THREE.FogExp2(color, density);

//Ambient Light
//const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(20, 30, -1);
scene.add(directionalLight)

const hatmanLight = new THREE.DirectionalLight(0xffff, 1);
//directionalLight.position.set(-1, -2, -1);
//scene.add(directionalLight)


//Sphere and plane
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({});
material.roughness = 0.7;

const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 1, 0)
//scene.add(sphere);


// glowoing square tets
// GLOWING SQUARE (add only)
const glowGeo = new THREE.BoxGeometry(2, 2, 3);
//const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
 const glowMat = new THREE.MeshStandardMaterial({
  color: 0x22,          // base color (keep darker)
  emissive: 0x0ff,       // glow color
  emissiveIntensity: 500    // 🔥 intensity
});


// create houses 
let repeat = 15; 
   let group = new THREE.Object3D();

const houseLoader = new GLTFLoader();
houseLoader.load("media/house/scene.gltf", function(gltf) {

  const baseHouse = gltf.scene;

  for (let i = 0; i < repeat; i += 3) {
    for (let j = 0; j < repeat; j += 3) {

      const house = baseHouse.clone(); // or SkeletonUtils.clone
      const house2 = baseHouse.clone(); 

      house.position.set(-10, 0, j*5);
      house2.position.set(10, 0, j*5);
      house2.rotation.y = Math.PI

      group.add(house);
      group.add(house2);

      // WINDOW LIGHTS 
      const glowGeo = new THREE.BoxGeometry(2, 2, 3);
      const glowGeo2 = new THREE.BoxGeometry(2, 2, 3);
      //const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0x22,          // base color (keep darker)
        emissive: 0x0ff,       // glow color
        emissiveIntensity: 500    // intensity
      });

      const glowMat2 = new THREE.MeshStandardMaterial({
        color: 0x22,          // base color (keep darker)
        emissive: 0x0ff,       // glow color
        emissiveIntensity: 500    // intensity
      });
      const glowSquareL1 = new THREE.Mesh(glowGeo, glowMat);
      const glowSquareL2 = new THREE.Mesh(glowGeo2, glowMat2);
      const glowSquareR1 = new THREE.Mesh(glowGeo, glowMat);
      const glowSquareR2 = new THREE.Mesh(glowGeo2, glowMat2);

      glowSquareL1.position.set(8, 2, 2.5+j*5); 
      glowSquareL2.position.set(8, 2, -2.5+j*5); 
      glowSquareR1.position.set(-8, 2, 2.5+j*5); 
      glowSquareR2.position.set(-8, 2, -2.5+j*5); 

      scene.add(glowSquareL1);
      scene.add(glowSquareL2);
      scene.add(glowSquareR1);
      scene.add(glowSquareR2); 


      // use later for street lights 
      const glowLight = new THREE.PointLight(0x00ffff, 1, 1.5);
      glowLight.position.set(8, 2, 2.5);

      scene.add(glowLight);


    }
  }

  scene.add(group);
});


//const ground = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const ground = new THREE.MeshLambertMaterial({
  color: 0xfff,
  blending: THREE.NormalBlending,
 transparent: false
});
const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 150), ground);
plane.receiveShadow = true; // Receives shadow

scene.add(plane);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.1;




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
directionalLight.shadow.radius = 1; // adds bluring effect





// spotlight
const spotLight = new THREE.SpotLight(0xff0000 ,5, 10, Math.PI * 0.3)
//new
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

//const ambientLight = new THREE.AmbientLight(0xffffff, .25);
//const directionalLight = new THREE.DirectionalLight(0xffffff, .25);

let pulseTime = 0; 
//ANIMATE
window.requestAnimationFrame(animate);
function animate() {
  controls.update();

  let x = directionalLight.position.x // move light source
  //x+= Math.random(-1,0);
  //log(x)
  directionalLight.position.set(x,5, 0)


// PULSE ANIMATION (add only)
pulseTime += 0.02;

// smooth sine wave (0 → 1 → 0)
const pulse = (Math.sin(pulseTime) + 1) / 2;

// brightness pulse
glowMat.color.set(0x00ffff); // keep color stable
glowMat.color.multiplyScalar(5 + pulse * 10);

// slight size pulse
//glowSquare.scale.set(1 + pulse * 0.2, 1 + pulse * 0.2, 1);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

