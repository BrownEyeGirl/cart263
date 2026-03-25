/** 
 * Three.js A First Example
It's time to create our scene and produce something on the screen.We need 4 elements to get started:

A scene that will contain objects
Some objects
A camera
A renderer // canvas is going ot render 3d objects 
 */


// library ref: because we are loading a module
import * as THREE from 'three';


//1. SCENE
const scene = new THREE.Scene() // creates an object Scene in the library THREE 


// 2. OBJECTS 
//A: the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1) // 3d coordinates, vague units ? 
//B: the material
const material = new THREE.MeshBasicMaterial({ color: 0x800080 }) // color can also b hex or rgb 
//C: put together
const mesh = new THREE.Mesh(geometry, material) // makes a mesh of combined material and geometry 
//D: ADD TO THE SCENE
scene.add(mesh) // 

// 3. CAMERA 
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // creates perspective cam, dif kinds of them: field of view (75 degrees), aspect ratio (w of canvas/height of canvas)
camera.position.z = 3 // zooms us outside of the cube as viewers 
scene.add(camera)

// 4. RENDERER 

//Access the Canvas
const canvas = document.querySelector('canvas#three-ex') // access canvas 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height) //give renderer the size

//render:
renderer.render(scene, camera) // translates everything into pixels 





