import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

let scene, camera, renderer;

let rainMesh;
let splashes = [];

const rainCount = 1200;
const areaSize = 50;
const rainSpeed = 0.4;

init();
animate();

function init() {

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050510);

  // camera
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 10, 20);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  // 🌍 ground plane (collision surface)
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
      color: 0x111122,
      roughness: 1
    })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  createRain();

  window.addEventListener("resize", onResize);
}





function createRain() {

  const geo = new THREE.BoxGeometry(0.02, 0.4, 0.02);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x66ccff,
    transparent: true,
    opacity: 0.6
  });

  rainMesh = new THREE.InstancedMesh(geo, mat, rainCount);

  const dummy = new THREE.Object3D();

  for (let i = 0; i < rainCount; i++) {

    dummy.position.set(
      (Math.random() - 0.5) * areaSize,
      Math.random() * 50,
      (Math.random() - 0.5) * areaSize
    );

    dummy.updateMatrix();
    rainMesh.setMatrixAt(i, dummy.matrix);
  }

  scene.add(rainMesh);
}

function spawnSplash(x, z) {

  const splash = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 8),
    new THREE.MeshBasicMaterial({
      color: 0x66ccff,
      transparent: true,
      opacity: 0.8
    })
  );

  splash.rotation.x = -Math.PI / 2;
  splash.position.set(x, 0.01, z);

  splash.userData.life = 1.0;

  scene.add(splash);
  splashes.push(splash);
}

function updateSplashes() {

  for (let i = splashes.length - 1; i >= 0; i--) {

    const s = splashes[i];

    s.userData.life -= 0.02;

    s.scale.setScalar(1 + (1 - s.userData.life) * 2);
    s.material.opacity = s.userData.life;

    if (s.userData.life <= 0) {
      scene.remove(s);
      splashes.splice(i, 1);
    }
  }
}

function updateRain() {

  const dummy = new THREE.Object3D();

  for (let i = 0; i < rainCount; i++) {

    rainMesh.getMatrixAt(i, dummy.matrix);
    dummy.position.setFromMatrixPosition(dummy.matrix);

    dummy.position.y -= rainSpeed;

    // 💥 HIT GROUND → spawn splash
    if (dummy.position.y < 0) {

      spawnSplash(dummy.position.x, dummy.position.z);

      dummy.position.y = 50;
      dummy.position.x = (Math.random() - 0.5) * areaSize;
      dummy.position.z = (Math.random() - 0.5) * areaSize;
    }

    dummy.updateMatrix();
    rainMesh.setMatrixAt(i, dummy.matrix);
  }

  rainMesh.instanceMatrix.needsUpdate = true;
}



function animate() {

  requestAnimationFrame(animate);

  updateRain();
  updateSplashes();

  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}