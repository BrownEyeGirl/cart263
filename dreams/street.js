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


// for blur effect 
import { ShaderPass } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js";
import { HorizontalBlurShader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/VerticalBlurShader.js";
import { BokehPass } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/BokehPass.js";

// for background
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/RGBELoader.js';



const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xfff, 10, 80);
scene.background = new THREE.Color(0xFFF)


// Directional light
const directionalLight = new THREE.DirectionalLight(0xfff, 3);
directionalLight.position.set(50, 50, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // we can make them more efficient, but needs to be by factors of 2
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.radius = 1; // adds bluring effect

scene.add(directionalLight)


// to see
const light = new THREE.AmbientLight( 0xfffff ); // soft white light
light.distance = 500; 
//scene.add( light );


//  CREATE HOUSES 
let repeat = 60; 
let group = new THREE.Object3D();

// CREATE CARS 
let carGroup = new THREE.Object3D(); 

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


const houses = []; // for animating 
let housePos = repeat; 
loader.load(" media/street/americ_an_football_house/scene.gltf", function(gltf) {
  const baseHouse = gltf.scene;
  baseHouse.scale.set(1, 1, 1); // uniform scale
  for (let j = 0; j < repeat; j += 3) {

    //  CLONE HOUSES
    const house = baseHouse.clone(true);
    const house2 = baseHouse.clone(true);

    house.position.set(-10, -0.2, j * 5);
    house.rotation.y=Math.PI/2; // 90

    house2.position.set(10, -0.2, j * 5);
    house2.rotation.y= -Math.PI/2; // 90

    group.add(house);
    group.add(house2);


    // grass



    // WINDOW LIGHTS (reuse geo + material so it doesnt freeze)
    /*const positions = [
      // [8, 2, 2.5 + j * 5], // x, y, 
      [-11, 0.5, -1 + j * 5],
      // [-8, 2, 2.5 + j * 5],
      [-11, 0.8, 0 + j * 5], //forward, height, lr
    ];

    positions.forEach((pos) => {
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(pos[0], pos[1], pos[2]);
      group.add(glow);
    });*/
  }


    loader.load("media/street/green_field_greener/scene.gltf", function(gltf) {

    const grassMain = gltf.scene;
    grassMain.scale.set(1, 1, 1); // uniform scale

      for (let j = -12; j < repeat; j += 3) {

        const grass = grassMain.clone(true);

        const grass2 = grassMain.clone(true);

        grass.position.set(-12.4, -0.2, j * 5);
        grass.rotation.y=Math.PI/2; // 90

        grass2.position.set(12.4, -0.2, j * 5);
        grass2.rotation.y= -Math.PI/2; // 90
        group.add(grass)
        group.add(grass2)

      }
  }); 

  scene.add(group);
  houses.push(group); 
});



 const orbMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0xEE4B2B,
        emissiveIntensity: 5
      });

      const orbMat2 = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0xFFEA00,
        emissiveIntensity: 5
      });

    
// load car 
const cars = []; // for animating 
loader.load("media/street/old_rusty_car/scene.gltf", function(gltf) {

  const carMain = gltf.scene;
  carMain.scale.set(0.01, 0.01, 0.01); // uniform scale
 

    for (let j = 0; j < 16; j += 8) {

      const car = carMain.clone(true);

       // car breaklights       
       const headLight = new THREE.SpotLight(0xffffff, 10, 8, Math.PI);
      const breakLight = new THREE.SpotLight(0xff0000, 10, 8, Math.PI);
      const breakLight2 = breakLight.clone();
      const headLight2 = headLight.clone(); 

      // orb 
      const orbGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const orb1 = new THREE.Mesh(orbGeo, orbMat);
      const orb2 = new THREE.Mesh(orbGeo, orbMat);
      const orb3 = new THREE.Mesh(orbGeo, orbMat2);
      const orb4 = new THREE.Mesh(orbGeo, orbMat2);

      car.position.set(2, 0.1, j * 5-10);
      orb1.position.set(1.15, 0.8, j * 5-13.5)
      breakLight.position.set(1.15, 0.8, j * 5-13.5)

      orb2.position.set(2.8, 0.8, j * 5-13.5)
      breakLight2.position.set(2.8, 0.8, j * 5-13.5)

      orb3.position.set(1.15, 0.8, j * 5-7)
      headLight.position.set(1.15, 0.8, j * 5-7)

      orb4.position.set(2.8, 0.8, j * 5-7)
      headLight2.position.set(2.8, 0.8, j * 5-7)

      carGroup.add(car)
      carGroup.add(orb1)
      carGroup.add(orb2)
      carGroup.add(orb3)
      carGroup.add(orb4)
      carGroup.add(breakLight)
      carGroup.add(breakLight2)
      carGroup.add(headLight)
      carGroup.add(headLight2)
      carGroup.rotation.y = Math.PI; // make the car come towards you
      
      scene.add(carGroup)
      cars.push(carGroup); // add to list of cars to animate 

    }
}); 


// church 
// load church (commented out)  
loader.load("media/street/entry_to_church_of_saints_cyril_and_methodius/scene.gltf", function(gltf) {

  const church = gltf.scene;
  church.scale.set(1, 1, 1); // uniform scale
  church.position.set(0, 17, (repeat-1) * 5);
  //scene.add(church)
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


//road
const textureLoader = new THREE.TextureLoader();
const roadTexture = textureLoader.load('media/street/road.jpg');

roadTexture.repeat.set(1, 10); 
roadTexture.wrapS = THREE.RepeatWrapping;
roadTexture.wrapT = THREE.RepeatWrapping;

const roadGeo = new THREE.PlaneGeometry(10, 500);
const roadMat = new THREE.MeshStandardMaterial({ map: roadTexture });

const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2; // make it horizontal
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
camera.position.x = 2;
camera.position.y = 3;
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

// HDR background 
// create refleuctive material 
const loaderEnviron = new RGBELoader();

loaderEnviron.load('media/street/underwater-light-rays.jpg', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = texture; // reflections
  scene.background = texture;  // visible skybox
});





// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// COMPOSER 
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.2,  // strength (intensity)
  0.4,  // radius (spread)
  0.85  // threshold (what glows)
);

composer.addPass(bloomPass);

// const vBlur = new ShaderPass(VerticalBlurShader); // vert blur 
// vBlur.uniforms.v.value = 1 / window.innerHeight;
// composer.addPass(vBlur);
// const hBlur = new ShaderPass(HorizontalBlurShader); // hor blur 
// hBlur.uniforms.h.value = 1 / window.innerWidth;
// composer.addPass(hBlur);


const bokeh = new BokehPass(scene, camera, {
  focus: 10.0,        // distance where image is sharp
  aperture: 0.0005,  // blur strength (smaller = subtle blur)
  maxblur: 0.01      // max blur allowed
});

composer.addPass(bokeh);

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
  // camera 
    camera.position.z += 0.03; // move forward along Z
    controls.target.set(0, 0, camera.position.z + 100);


  controls.update();

  // PULSE ANIMATION (add only)
  pulseTime += 0.02;

  // smooth sine wave (0 → 1 → 0)
  const pulse = (Math.sin(pulseTime) + 1) / 2;

  // brightness pulse
  glowMat.color.set(0x00ffff); // keep color stable
  glowMat.color.multiplyScalar(5 + pulse * 10);

  // IMPORTANT clears light objects to free up space 
  if(camera.position.z < repeat*5-20) {
    // car animation (if on moving scene) 
      cars.forEach((car) => {
        car.position.z -= 0.08; // move forward

        // optional reset loop
        if (camera.position.z > car.position.z+20) {
          car.position.z = camera.position.z+Math.random()*80+100;
        }

      });
  }

  else {
    // free up space
    //scene.remove(carGroup)

    // freeze camera at the end of the line 
    //camera.position.z=repeat*5-20; 
  }


  const spacing = 15;
const recycleDistance = 35;

//camera.position.z += 0.1;
const totalLength = spacing * houses.length;

houses.forEach((house) => {
  if (camera.position.z - house.position.z > totalLength / 2) {
    house.position.z += totalLength;
  }
});

  composer.render();

  window.requestAnimationFrame(animate);
}

