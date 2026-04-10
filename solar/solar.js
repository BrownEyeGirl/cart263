import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// lense flare 
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';






let vel=2; 
let baseFreq = 130; 
let scaleOrb = 3.5; 
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffff00, 0xffff00, 0xffff00]; // red, green, blue, yellow


const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000); 


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 50, 100);
camera.position.z = 120;


// ~LENS FLARE ~~~



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);





// add controls 
const controls = new OrbitControls(camera, renderer.domElement);
// Optional but recommended
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2; // limit tilt



// LINE FOR CONTEXT
const start = new THREE.Vector3(10, 0, -100); // vector points will randomize around 
const end = new THREE.Vector3(0, 0, 0);
const points = []; // points array 
for (let i = 0; i < 100; i++) { // generate 100 points 
  const t = Math.random(); // rantom position of points 
  const pointOnLine = new THREE.Vector3().lerpVectors(start, end, t); // lerp? idk 
  const direction = new THREE.Vector3().subVectors(end, start).normalize(); // 

  let randomVec = new THREE.Vector3( // random perp vector from main vector 
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  );
  const perpendicular = new THREE.Vector3() // make vector perp from the 
    .crossVectors(direction, randomVec)
    .normalize();
  const distance =  Math.random() * 8; // rand dist from line 
  const finalPoint = pointOnLine.clone().add(perpendicular.multiplyScalar(distance)); // place the final point 
  points.push(finalPoint); // add the point to list of points 
}

const geometryP = new THREE.BufferGeometry().setFromPoints(points);
const materialP = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
const particles = new THREE.Points(geometryP, materialP);
const positions = geometryP.attributes.position; // Store original positions
const originalPositions = positions.array.slice(); // copy
scene.add(particles);





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
  color: 0xfffffff,
  transparent: true,
  blending: THREE.AdditiveBlending
});

const flare = new THREE.Sprite(spriteMaterial);
flare.scale.set(20, 20, 100); // size of the glow
flare.position.copy(sun.position);
scene.add(flare);

// give the sun some light
const sunLight = new THREE.PointLight(0xfff, 100, 100);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;        // Enable shadows
sunLight.falloff = 0;
sunLight.shadow.mapSize.width = 1024; // Resolution of the shadow map
sunLight.shadow.mapSize.height = 1024;
scene.add(sunLight);

// ambient light incase if i messed up the sun light
//const ambient = new THREE.AmbientLight(0x404040);
//scene.add(ambient);


// 🌍 Planet data (scaled)
const planets = [
  { name: "Mercury", distance: 10, size: 0.5*scaleOrb, speed: 4.15*vel, freq: 0.240846*baseFreq},
  { name: "Venus", distance: 15, size: 0.9*scaleOrb, speed: 1.62*vel, freq: 0.615*baseFreq},
  { name: "Earth", distance: 20, size: 1*scaleOrb, speed: 1.0*vel, freq: 1*baseFreq},
  { name: "Mars", distance: 25, size: 0.7*scaleOrb, speed: 0.53*vel, freq: 1.881*baseFreq},
  { name: "Jupiter", distance: 35, size: 2.5*scaleOrb, speed: 0.084*vel, freq: 11.862*baseFreq},
  { name: "Saturn", distance: 45, size: 2.2*scaleOrb, speed: 0.034*vel, freq: 29.457*baseFreq},
  { name: "Uranus", distance: 55, size: 1.6*scaleOrb, speed: 0.012*vel, freq: 84.017*baseFreq},
  { name: "Neptune", distance: 65, size: 1.5*scaleOrb, speed: 0.006*vel, freq: 164.8*baseFreq}
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
  const material = new THREE.MeshStandardMaterial({
  color: 0x6a5acd,       // base color
  metalness: 1.0,        // fully metallic
  roughness: 0.02,        // smooth surface (low roughness = shinier)
  emissive: 0x6a5acd,          // glow color
  emissiveIntensity: 1.5       // strength of glow
});

const geometry = new THREE.SphereGeometry(p.size, 64, 64); // radius 1, high segments for smoothness
  const orb = new THREE.Mesh(geometry, material);

//const sprite = new THREE.Sprite(material);
  //sprite.scale.set(p.size * 2, p.size * 2, 1); // scale according to planet size

  // Optional: add a point light for glow (same as before)
  const light = new THREE.PointLight(colors[index % colors.length], 1000, 1000);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  //sprite.add(light);

  // Random starting angle for orbit
  const angle = Math.random() * Math.PI * 2;

  scene.add(orb);
  iter++; 

  return { ...p, mesh: orb, angle };
});


// ⚡ Tone.js Setup 

// Array of different notes for each planet
const planetNotes = [196.22,163.51,130.81,174.41,327.03,209.30,294.32,245.14]; 

// Create a synth for each planet
// ANGELIC PLANET SYNTHS

// Create global effects
const reverb = new Tone.Reverb({
  decay: 4,       // long tail
  preDelay: 0.2
}).toDestination();

const chorus = new Tone.Chorus({
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  type: "sine"
}).connect(reverb);

// Replace planetSynths with angelic PolySynths
const planetSynths = planetMeshes.map(() => {
  return new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },  // soft, pure tone
    envelope: {
      attack: 0.5,   // smooth fade-in
      decay: 0.2,
      sustain: 0.4,
      release: 2.0   // long release for floating notes
    },
    volume: -12
  }).connect(chorus);
});

const noise = new Tone.Noise("white").toDestination(); // ambient noise 
noise.volume.value = -70; // shhh
noise.start();

// Track triggers and original colors
const lineX = 0;           
const triggered = new Set(); // track which planets already triggered
const originalColors = planetMeshes.map(p => p.mesh.material.color.clone());

// Function to play sound for one second
function playNote(synth, note, duration = 1) {
if (!note || !synth) return;
  
  // If duration is 0, set a default
  if (duration <= 0) duration = "8n";

  if(note > 200) {
    const volume = new Tone.Volume(-12); // volume in decibels (dB)
synth.connect(volume);
volume.toDestination();
  }

// 3. Play note
synth.triggerAttackRelease(note, duration);
  
}

// 💫 Animation loop
function animate(time) {
  requestAnimationFrame(animate);


  // PARTICLES LINE 
    for (let i = 0; i < positions.count; i++) {
    const i3 = i * 3;

    //const x = originalPositions[i3];
    const y = originalPositions[i3 + 1];
    //const z = originalPositions[i3 + 2];

    // floating motion
    const offset = Math.sin(time * 0.003 + i);
    positions.array[i3 + 1] = y + offset; // move Y
  }

  positions.needsUpdate = true;





  controls.update(); // REQUIRED when damping is on

  planetMeshes.forEach((p, index) => {
    p.angle += p.speed * 0.01; // speed multiplier

    // Update planet position
    p.mesh.position.x = Math.cos(p.angle) * p.distance;
    p.mesh.position.z = Math.sin(p.angle) * p.distance;

    // Trigger sound when crossing lineX from left to right
    if (p.mesh.position.x > lineX && !triggered.has(index)) {
      // Play the planet's unique note
      
      playNote(planetSynths[index], planetNotes[index], (1-p.speed)+0.3);

      // Temporarily change color
      p.mesh.material.map = loader.load('https://c-p.rmcdn1.net/5e8cc305398b440084d433ac/1901283/upload-5d6b183c-94df-45d9-86bb-a4aea76e0462.png');
      setTimeout(() => {
       // p.mesh.material.color.map = loader.load('media/mercury_pixelated.png');
      }, p.speed/2);

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
