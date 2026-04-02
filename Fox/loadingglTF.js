  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from "three";


  const scene = new THREE.Scene();
// Canvas
const canvas = document.querySelector("canvas#three-ex");

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight)

//Sphere and plane
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({});
material.roughness = 0.7;

const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 1, 0)
scene.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
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

  // aim of this - to load a fox as three diffrent glTF types: glTF, glTF-Binary, glTF-Embedded
const gltfLoader = new GLTFLoader();



    try {
  gltfModel = await gltfLoader.loadAsync("glTF/Fox.gltf");
  addAndRun(gltfModel)

} catch (error) {
  console.log(error.message);
}


function addAndRun(loadedObj){
  console.log(loadedObj);
  let foxModel = loadedObj.scene.children[0]
  scene.add(foxModel);
  foxModel.scale.set(.015,.015,.015)

  window.requestAnimationFrame(animate);

  function animate() {
    // Update controls
    controls.update();
    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }
}

