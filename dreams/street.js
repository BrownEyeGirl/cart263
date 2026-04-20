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

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(20, 30, -1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // we can make them more efficient, but needs to be by factors of 2
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 1; // adds bluring effect

scene.add(directionalLight)


// to see
const light = new THREE.AmbientLight( 0xfffff ); // soft white light
scene.add( light );


//  CREATE HOUSES 
let repeat = 15; 
let group = new THREE.Object3D();

//  CREATE ONCE (outside loops)
const windowLight = new THREE.PointLight(0x00ffff, 5, 10); 
windowLight.distance = 50;
windowLight.intensity = 500;
//windowLight.decay = 10;


const glowGeo = new THREE.BoxGeometry(2, 2, 3);
const glowMat = new THREE.MeshStandardMaterial({
  color: 0x002222,
  emissive: 0x00ffff,
  emissiveIntensity: 5
});
//glowMat.add(windowLight);

const loader = new GLTFLoader();
//loader.setPath("media/street/simple_house/"); // load textures

loader.load(" media/street/americ_an_football_house/scene.gltf", function(gltf) {

  const baseHouse = gltf.scene;
  baseHouse.scale.set(1, 1, 1); // uniform scale

  
  


  for (let i = -repeat/2; i < repeat/2; i += 3) {
    for (let j = -repeat/2; j < repeat/2; j += 3) {

      //  CLONE HOUSES
      const house = baseHouse.clone(true);

      const house2 = baseHouse.clone(true);

      house.position.set(-10, -0.2, j * 5);
      house.rotation.y=Math.PI/2; // 90

      house2.position.set(10, -0.2, j * 5);
      house2.rotation.y= -Math.PI/2; // 90

      group.add(house);
      group.add(house2);

      // WINDOW LIGHTS (reuse geo + material so it doesnt freeze)
      const positions = [
       // [8, 2, 2.5 + j * 5], // x, y, 
        [-11, 0.5, -1 + j * 5],
       // [-8, 2, 2.5 + j * 5],
        [-11, 0.5, 0 + j * 5], //forward, height, lr
      ];

      positions.forEach((pos) => {
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(pos[0], pos[1], pos[2]);
        scene.add(glow);
      });
      


    }
  }

  scene.add(group);
});

// load grass 
loader.load("media/street/green_field_greener/scene.gltf", function(gltf) {

  const grassMain = gltf.scene;
  grassMain.scale.set(1, 1, 1); // uniform scale
 

 for (let i = -repeat/2; i < repeat/2; i += 3) {
    for (let j = -repeat/2; j < repeat/2; j += 3) {

      const grass = grassMain.clone(true);

      const grass2 = grassMain.clone(true);

      grass.position.set(-12.4, -0.2, j * 5);
      grass.rotation.y=Math.PI/2; // 90

      grass2.position.set(12.4, -0.2, j * 5);
      grass2.rotation.y= -Math.PI/2; // 90
      scene.add(grass)
      scene.add(grass2)

      //group.add(grass);
     // group.add(grass2);
    }
  }
  

}); 




/*lLoader.load("media/street/streetlight/scene.gltf", function(gltf) {

  const lamp = gltf.scene;

  lamp.position.set(0, 0, 0);
  lamp.scale.set(20,20,20)
  scene.add(lamp);

  const streetLight = new THREE.SpotLight(
  0xffcc88,        // warm sodium-vapor streetlight
  2.5,             // intensity
  20,              // range
  Math.PI * 0.25   // narrower cone
);

streetLight.decay = 2;
streetLight.penumbra = 0.6;
/*const bulb = new THREE.Mesh(
  new THREE.SphereGeometry(0.1),
  new THREE.MeshBasicMaterial({ color: 0xffddaa })
);

streetLight.add(bulb); */

//});
// streetlight 
/*const spotLight = new THREE.SpotLight(0xff0000, 5, 80, Math.PI * 3); // color, intensity, distance, cone size
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);*/


const textureLoader = new THREE.TextureLoader();
const roadTexture = textureLoader.load('media/street/road.jpg');


roadTexture.repeat.set(1, 10); 
//roadTexture.center.set(0.5, 0.5); // rotate around center
//roadTexture.rotation = Math.PI / 2; // 90 degrees

roadTexture.wrapS = THREE.RepeatWrapping;
roadTexture.wrapT = THREE.RepeatWrapping;


const roadGeo = new THREE.PlaneGeometry(10, 100);
const roadMat = new THREE.MeshStandardMaterial({ map: roadTexture });

const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2; // make it horizontal
//road.rotation.y = -Math.PI/2;
scene.add(road);


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


//RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;


// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// SPOTLIGHT
/*const spotLight = new THREE.SpotLight(0xff0000 ,5, 10, Math.PI * 0.3)
//new
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)
*/


//ANIMATE
let pulseTime = 0; 
window.requestAnimationFrame(animate);
function animate() {
  controls.update();

  //let x = directionalLight.position.x // move light source
  //directionalLight.position.set(x,5, 0)

  // PULSE ANIMATION (add only)
  pulseTime += 0.02;

  // smooth sine wave (0 → 1 → 0)
  const pulse = (Math.sin(pulseTime) + 1) / 2;

  // brightness pulse
  glowMat.color.set(0x00ffff); // keep color stable
  glowMat.color.multiplyScalar(5 + pulse * 10);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

