import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
//import * as Tone from "https://unpkg.com/tone@14.7.77/build/Tone.js";

//import * as Tone from "https://cdn.jsdelivr.net/npm/tone@latest/build/Tone.js";
//  import * as Tone from "https://cdn.jsdelivr.net/npm/tone@latest/build/Tone.js";

/*nitialize the noise and start
//var noise = new Tone.Noise("pink").start();

//make an autofilter to shape the noise
var autoFilter = new Tone.AutoFilter({
	"frequency" : "8m",
	"min" : 800,
	"max" : 15000
}).connect(Tone.Master);

//connect the noise
noise.connect(autoFilter);
//start the autofilter LFO
autoFilter.start() */

let vel=5; 
let scaleOrb = 2; 
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffff00, 0xffff00, 0xffff00]; // red, green, blue, yellow
//let col = [1252FF, 1252FF, 1252FF, 1252FF]


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff); 


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 50, 100);
camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add controls 
const controls = new OrbitControls(camera, renderer.domElement);
// Optional but recommended
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2; // limit tilt

// add line for context
// 1. Define points along the x-axis
const points = [];
points.push(new THREE.Vector3(0, 0, -100)); // start of line
points.push(new THREE.Vector3(0, 0, 100));  // end of line

// 2. Create geometry from points
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 3. Create material for the line
const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // red

// 4. Create the line mesh
const line = new THREE.Line(geometry, material);

// 5. Add to scene
scene.add(line);


const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,        // base color
  emissive: 0xffff33,     // glow color
  emissiveIntensity: 2,   // brigtness high to mask orb 
  metalness: 0.1,
  roughness: 7
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
//scene.add(sun);

const textureLoader = new THREE.TextureLoader();
const flareTexture = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');

const spriteMaterial = new THREE.SpriteMaterial({
  map: flareTexture,
  color: 0xffff66,
  transparent: true,
  blending: THREE.AdditiveBlending
});

const flare = new THREE.Sprite(spriteMaterial);
flare.scale.set(20, 20, 1); // size of the glow
flare.position.copy(sun.position);
scene.add(flare);

// give the sun some light 
/*const sunLight = new THREE.PointLight(0xffffff, 1000, 1000);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;        // Enable shadows
sunLight.falloff = 0;
sunLight.shadow.mapSize.width = 1024; // Resolution of the shadow map
sunLight.shadow.mapSize.height = 1024;
scene.add(sunLight);*/

// ambient light incase if i messed up the sun light
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);


// 🌍 Planet data (scaled)
const planets = [
  { name: "Mercury", distance: 10, size: 0.5*scaleOrb, speed: 4.15*vel },
  { name: "Venus", distance: 15, size: 0.9*scaleOrb, speed: 1.62*vel },
  { name: "Earth", distance: 20, size: 1*scaleOrb, speed: 1.0*vel },
  { name: "Mars", distance: 25, size: 0.7*scaleOrb, speed: 0.53*vel },
  { name: "Jupiter", distance: 35, size: 2.5*scaleOrb, speed: 0.084*vel },
  { name: "Saturn", distance: 45, size: 2.2*scaleOrb, speed: 0.034*vel },
  { name: "Uranus", distance: 55, size: 1.6*scaleOrb, speed: 0.012*vel },
  { name: "Neptune", distance: 65, size: 1.5*scaleOrb, speed: 0.006*vel }
];

let iter = 0; 

// Load texture for all planets
const loader = new THREE.TextureLoader();
let planetTexture = loader.load('https://c-p.rmcdn1.net/5e8cc305398b440084d433ac/1901283/upload-5d6b183c-94df-45d9-86bb-a4aea76e0462.png');
const planetT = [
    'media/mercury_pixelated.png', // mercury 
    'media/mercury_pixelated.png', // venus
    'media/earth_pixelated1.png', // earth
    'media/mercury_pixelated.png', // mars 
    'https://c-p.rmcdn1.net/5e8cc305398b440084d433ac/1901283/upload-5d6b183c-94df-45d9-86bb-a4aea76e0462.png', // jupiter 
    'media/mercury_pixelated.png', // saturn 
    'media/mercury_pixelated.png', // uranus 
    'media/mercury_pixelated.png' // neptune 
]


// Create planets as sprites
const planetMeshes = planets.map((p, index) => {
    planetTexture = loader.load(planetT[4]); 
  const material = new THREE.SpriteMaterial({
    map: planetTexture,
    transparent: true // keep alpha if the image has it
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(p.size * 2, p.size * 2, 1); // scale according to planet size

  // Optional: add a point light for glow (same as before)
  const light = new THREE.PointLight(colors[index % colors.length], 1000, 1000);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  sprite.add(light);

  // Random starting angle for orbit
  const angle = Math.random() * Math.PI * 2;

  scene.add(sprite);
  iter++; 

  return { ...p, mesh: sprite, angle };
});


// ⚡ Tone.js Setup 

// Array of different notes for each planet
const planetNotes = ["C4","D4","E4","F4","G4","A4","B4","C5"]; 

// Create a synth for each planet
const planetSynths = planetMeshes.map(() => new Tone.Synth().toDestination());

// Track triggers and original colors
const lineX = 0;           
const triggered = new Set(); // track which planets already triggered
const originalColors = planetMeshes.map(p => p.mesh.material.color.clone());

// Function to play sound for one second
function playNote(synth, note, duration = 1) {
  synth.triggerAttackRelease(note, duration);
}

// 💫 Animation loop
function animate() {
  requestAnimationFrame(animate);

  controls.update(); // REQUIRED when damping is on

  planetMeshes.forEach((p, index) => {
    p.angle += p.speed * 0.01; // speed multiplier

    // Update planet position
    p.mesh.position.x = Math.cos(p.angle) * p.distance;
    p.mesh.position.z = Math.sin(p.angle) * p.distance;

    // Trigger sound when crossing lineX from left to right
    if (p.mesh.position.x > lineX && !triggered.has(index)) {
      // Play the planet's unique note
      playNote(planetSynths[index], planetNotes[index], 0.3);

      // Temporarily change color
      p.mesh.material.map = loader.load('media/mercury_pixelated.png');
      setTimeout(() => {
       // p.mesh.material.color.map = loader.load('media/mercury_pixelated.png');
      }, 100);

      triggered.add(index);  // mark as triggered
    }

    // Reset trigger if planet moves back past the line
    if (p.mesh.position.x < lineX && triggered.has(index)) {
      triggered.delete(index);
      p.mesh.material.map = loader.load('media/earth_pixelated.png');
    }
  });

  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
