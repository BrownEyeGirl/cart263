import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;

init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );
  camera.position.set(0, 0, 1); // slightly forward

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.NoToneMapping; // try to make corners invisible

  document.body.appendChild(renderer.domElement);

  //  Skybox
  const loader = new THREE.CubeTextureLoader();
  const skyboxTexture = loader.load([
    "./textures/skybox/bluecloud_ft.jpg", // pz (front)
             "./textures/skybox/bluecloud_bk.jpg", // nz (back)


"./textures/skybox/bluecloud_up.jpg", // py (top)
  "./textures/skybox/bluecloud_dn.jpg", // ny (bottom)
   
    "./textures/skybox/bluecloud_rt.jpg", // px (right)

"./textures/skybox/bluecloud_lf.jpg" // nx (left) 

    
  
  ]);
  scene.background = skyboxTexture;

  //  Controls 
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false; // keeps it like a head-turning camera
  controls.rotateSpeed = 0.5;

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // important

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}