import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// raycasting -> object that has the ability to shoot an array 


// add scene, camera, renderer
const scene = new THREE.Scene()
const sizes = {
    width: 800,
    height: 600
}
const canvas = document.querySelector('canvas#three-ex')
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
