import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// lense flare 
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

// afterimage 
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
/*import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js'; */
import { AfterimagePass } from "https://cdn.jsdelivr.net/npm/three@0.144.0/examples/jsm/postprocessing/AfterimagePass.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.144.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.144.0/examples/jsm/postprocessing/RenderPass.js";

// afterimage
let afterimagePass;
let composer
const params = {

  enable: true

};


// SLIDER VALUES
let vel=2; 
const velSlider = document.createElement("input");
velSlider.type = "range"; // slide 
velSlider.min = 1;
velSlider.max = 25;
velSlider.value = 2;

// style it (optional)
velSlider.style.position = "absolute";
velSlider.style.top = "20px";
velSlider.style.left = "20px";
velSlider.style.zIndex = "10";
velSlider.style.color = "pink"; 
velSlider.classList.add("vel-slider");

// add label 
const container = document.createElement("div");
container.style.position = "absolute";
container.style.top = "20px";
container.style.left = "20px";
container.style.color = "white";
container.style.fontFamily = "sans-serif";

const label = document.createElement("div");
label.textContent = "Velocity";

container.appendChild(label);
container.appendChild(velSlider);
document.body.appendChild(container);
//document.body.appendChild(velSlider);

// listen for chaanges 
velSlider.addEventListener("input", (e) => {
  vel = e.target.value;
  console.log(vel);
});



// vars 
let baseFreq = 130; 
let scaleOrb = 3; 
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffff00, 0xffff00, 0xffff00]; // red, green, blue, yellow


const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x000000, 1, 1000 ); // afterimage 
scene.background = new THREE.Color(0x0000); 


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 50, 100);
camera.position.z = 120;


// ~LENS FLARE ~~~
// const flareTextures = [
//   { textureUrl: "https://static.vecteezy.com/system/resources/thumbnails/016/622/342/small/transparent-sunlight-special-lens-flare-light-effect-isolated-background-png.png", size: 2000, dist: 0 },
//   { textureUrl: "https://static.vecteezy.com/system/resources/thumbnails/016/622/342/small/transparent-sunlight-special-lens-flare-light-effect-isolated-background-png.png", size: 2500, dist: 0.1 },
//   { textureUrl: "https://static.vecteezy.com/system/resources/thumbnails/016/622/342/small/transparent-sunlight-special-lens-flare-light-effect-isolated-background-png.png", size: 1250, dist: 0.4 },
//   { textureUrl: "https://static.vecteezy.com/system/resources/thumbnails/016/622/342/small/transparent-sunlight-special-lens-flare-light-effect-isolated-background-png.png", size: 3750, dist: 1.8 },
// ];

// const light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
// const lensflare = new Lensflare();
// const textureLoader2 = new THREE.TextureLoader();

// lensflare.addElement( new LensflareElement( textureLoader2.load(flareTextures[0].textureUrl), 512, 0 ) );
// lensflare.addElement( new LensflareElement( flareTextures[0].textureURL, 512, 0 ) );
// lensflare.addElement( new LensflareElement( flareTextures[0].textureURL, 60, 0.6 ) );
// light.add( lensflare );



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// afterimage
composer = new EffectComposer( renderer );
				composer.addPass( new RenderPass( scene, camera ) );

				afterimagePass = new AfterimagePass();
        //afterimagePass.uniforms["damp"].value = 0.9;
				composer.addPass( afterimagePass );


				//window.addEventListener( 'resize', onWindowResize );

				const gui = new GUI( { title: 'Damp setting' } );
       gui.add(afterimagePass.uniforms.damp, "value", 0, 1).name("damp");
				gui.add( params, 'enable' );



// add controls 
const controls = new OrbitControls(camera, renderer.domElement);
// Optional but recommended
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2; // limit tilt



// LINE FOR CONTEXT
const start = new THREE.Vector3(10, 0, -200); // vector points will randomize around 
const end = new THREE.Vector3(0, 0, 0);
const points = []; // points array 
for (let i = 0; i < 200; i++) { // generate 100 points 
  const t = Math.random();//1-i/100;  // rantom position of points 
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
  const distance =  Math.random() +(i/10); // rand dist from line 
  const finalPoint = pointOnLine.clone().add(perpendicular.multiplyScalar(distance)); // place the final point 
  points.push(finalPoint); // add the point to list of points 
}

const geometryP = new THREE.BufferGeometry().setFromPoints(points);
const materialP = new THREE.PointsMaterial({ color: 0xFFC000, size: 0.1 });
const particles = new THREE.Points(geometryP, materialP);
const positions = geometryP.attributes.position; // Store original positions
const originalPositions = positions.array.slice(); // copy
scene.add(particles);




// SUN 
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
const sunLight = new THREE.PointLight(0xffffff, 0, 0);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;        // Enable shadows
sunLight.falloff = 0;
sunLight.shadow.mapSize.width = 1024; // Resolution of the shadow map
sunLight.shadow.mapSize.height = 1024;
scene.add(sunLight);

// ambient light incase if i messed up the sun light
const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);


// 🌍 Planet data (scaled)
const planets = [
  { name: "Mercury", distance: 10, size: 0.5*scaleOrb, speed: 4.15, freq: 0.240846*baseFreq},
  { name: "Venus", distance: 15, size: 0.9*scaleOrb, speed: 1.62, freq: 0.615*baseFreq},
  { name: "Earth", distance: 20, size: 1*scaleOrb, speed: 1.0, freq: 1*baseFreq},
  { name: "Mars", distance: 25, size: 0.7*scaleOrb, speed: 0.53, freq: 1.881*baseFreq},
  { name: "Jupiter", distance: 35, size: 2.5*scaleOrb, speed: 0.084, freq: 11.862*baseFreq},
  { name: "Saturn", distance: 45, size: 2.2*scaleOrb, speed: 0.034, freq: 29.457*baseFreq},
  { name: "Uranus", distance: 55, size: 1.6*scaleOrb, speed: 0.012, freq: 84.017*baseFreq},
  { name: "Neptune", distance: 65, size: 1.5*scaleOrb, speed: 0.006, freq: 164.8*baseFreq}
];

let iter = 0; 

// Load texture for all planets
const loader = new THREE.TextureLoader();
let planetTexture = loader.load('https://c-p.rmcdn1.net/5e8cc305398b440084d433ac/1901283/upload-5d6b183c-94df-45d9-86bb-a4aea76e0462.png');
const planetT = [
    'media/mercury_wrap.jpg', // mercury 
    'media/venus_wrap.jpg', // venus
    'media/earth_wrap.jpg', // earth
    'media/mars_wrap.jpg', // mars 
    'media/jupiter_wrap.avif', // jupiter 
    'media/saturn_wrap.jpg', // saturn 
    'media/uranus_wrap.jpg', // uranus 
    'media/neptune_wrap.jpeg' // neptune 
]


// Create planets as sprites
const planetMeshes = planets.map((p, index) => {
    /**
     * calculate frequencies 
     * log-frequency mapping -> fsound​ = f0​⋅2^(klog2​(r)) = f0​⋅rk
     * where: 
     * f0 = 200hz (neutral frequency to build around)
     * k = 0.5 (compression factor so everything fits comfortably, common in sonification)
     * */
  
      p.freq = 200*Math.sqrt(p.speed) // normalize into pleasant hz (important!!)


    planetTexture = loader.load(planetT[index]); 
    planetTexture.wrapS = THREE.ClampToEdgeWrapping;
    planetTexture.wrapT = THREE.ClampToEdgeWrapping;
    planetTexture.repeat.set(1, 1);



  const material = new THREE.MeshStandardMaterial({
  color: 0x6a5acd,       // base color
  metalness: 1.0,        // fully metallic
  roughness: 0.02,        // smooth surface (low roughness = shinier)
  emissive: 0x6a5acd,          // glow color
  emissiveIntensity: 0.6      // strength of glow
});



//const sprite = new THREE.Sprite(planetTexture);
// const sprite = new THREE.Sprite(
//   new THREE.MeshStandardMaterial({
//     map: planetTexture,
//     blending: THREE.AdditiveBlending,
//     transparent: true,
//     depthWrite: false
//   })
// );
//   sprite.scale.set(p.size * 2, p.size * 2, 1); // scale according to planet size

const material1 = new THREE.MeshStandardMaterial({
  map: planetTexture,
  //emissive: 0x6a5acd,          // glow color
  //emissiveIntensity: 0.6,      // strength of glow
  roughness: 1,
  metalness: 0
});

const geometry = new THREE.SphereGeometry(p.size, 64, 64); // radius 1, high segments for smoothness
  const orb = new THREE.Mesh(geometry, material1);


  // attach to orb
//orb.add(sprite);
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
//const planetNotes = [196.22,163.51,130.81,174.41,327.03,209.30,294.32,245.14]; 

// Create a synth for each planet
// ANGELIC PLANET SYNTHS

// Create global effects

const highGain = new Tone.Gain(0.6);
const lowGain = new Tone.Gain(1);

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
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.5,
      decay: 0.2,
      sustain: 0.4,
      release: 2.0, 
      maxPolyphony: 2 // IMPORTANT
    },
    volume: -12
  });

  synth.connect(chorus);
  return synth;
});

chorus.connect(lowGain);
chorus.connect(highGain);


// Function to play sound for one second
function playNote(synth, note, duration = "8n") {
  if (!note || !synth) return;
  if (duration <= 0) duration = "8n";

  if (note > 100) {
    highGain.gain.value = 0.3;
    lowGain.gain.value = 1;
  } else {
    highGain.gain.value = 1;
    lowGain.gain.value = 0.5;
  }


  synth.triggerAttackRelease(note, duration);
}



const noise = new Tone.Noise("white").toDestination(); // ambient noise 
noise.volume.value = -70; // shhh
noise.start();



// Track triggers and original colors
const lineX = 0;           
const triggered = new Set(); // track which planets already triggered
const originalColors = planetMeshes.map(p => p.mesh.material.color.clone());



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
    p.angle += p.speed*vel * 0.01; // speed multiplier

    // Update planet position
    p.mesh.position.x = Math.cos(p.angle) * p.distance;
    p.mesh.position.z = Math.sin(p.angle) * p.distance;

    // Trigger sound when crossing lineX from left to right
    if (p.mesh.position.x > lineX && !triggered.has(index)) {
      // Play the planet's unique note
      playNote(planetSynths[index], p.freq, (1-p.speed*vel)+0.3);

      // Temporarily change color
     // p.mesh.material.map = loader.load('https://c-p.rmcdn1.net/5e8cc305398b440084d433ac/1901283/upload-5d6b183c-94df-45d9-86bb-a4aea76e0462.png');
      //setTimeout(() => {
       // p.mesh.material.color.map = loader.load('media/mercury_pixelated.png');
     /// }, p.speed/2);

      triggered.add(index);  // mark as triggered
    }

    // Reset trigger if planet moves back past the line
    if (p.mesh.position.x < lineX && triggered.has(index)) {
      triggered.delete(index);
     // p.mesh.material.map = loader.load('media/earth_pixelated.png');
    }
  });

  // afterimage
  afterimagePass.enabled = params.enable;
  composer.render();

  //renderer.render(scene, camera);
}

animate();

// Resize handling
/*window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});*/
// adapted for after image 
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  composer.setSize(width, height); // 🔥 REQUIRED

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});



